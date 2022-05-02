import {
    collection,
    doc,
    getDocs,
    increment,
    writeBatch,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { auth, firestore } from '../firebase/config.firebase'
import authModalState from '../recoil/atoms/auth-modal.atom'
import communitySnippetState from '../recoil/atoms/community.atom'
import { TCommunity, TCommunitySnippet } from '../types/community.types'

const useCommunityData = () => {
    const [user] = useAuthState(auth)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [communityState, setCommunityState] = useRecoilState(
        communitySnippetState
    )

    const [, setModalState] = useRecoilState(authModalState)

    const joinCommunity = async (communityData: TCommunity) => {
        setIsLoading(true)

        const communitySnippetsRef = doc(
            firestore,
            `users/${user?.uid}/communitySnippets`,
            communityData.id
        )
        const communityRef = doc(firestore, `communities`, communityData.id)

        const batch = writeBatch(firestore)

        const newCoomunityData = {
            communityID: communityData.id,
            imageURL: communityData.imageURL ?? '',
            isModerator: false,
        }

        batch.set(communitySnippetsRef, newCoomunityData)

        batch.update(communityRef, {
            numberOfMembers: increment(1),
        })

        try {
            /* // 1) Update firebase
                Update communitySnippets
                Update community memebers */
            await batch.commit()

            // 2) Update Recoil state
            setCommunityState(prevState => ({
                ...prevState,
                mySnippets: [...prevState.mySnippets, newCoomunityData],
            }))
        } catch (error) {
            toast.error(
                'Cannot join community. Refresh the page and try again.'
            )
            console.log(error)
        }

        setIsLoading(false)
    }

    const leaveCommunity = async (communityID: string) => {
        setIsLoading(true)
        const communitySnippetsRef = doc(
            firestore,
            `users/${user?.uid}/communitySnippets`,
            communityID
        )
        const communityRef = doc(firestore, `communities`, communityID)

        const batch = writeBatch(firestore)

        batch.delete(communitySnippetsRef)

        batch.update(communityRef, { numberOfMembers: increment(-1) })

        try {
            /* // 1) Update firebase
                delete community from communitySnippets
                Decrement community memebers */
            await batch.commit()

            // 2) Update Recoil state
            setCommunityState(prevState => ({
                ...prevState,
                mySnippets: prevState.mySnippets.filter(
                    communityData => communityData.communityID !== communityID
                ),
            }))
        } catch (error) {
            toast.error(
                'Cannot leave the community. Refresh the page and try again.'
            )
            console.log(error)
        }
        setIsLoading(false)
    }

    const communityMembershipToggle = (
        communityData: TCommunity,
        isJoined: boolean
    ) => {
        // if not signed in, show sign in modal
        if (!user)
            return setModalState(prevState => ({
                ...prevState,
                view: 'logIn',
                open: true,
            }))

        if (isJoined)
            confirm('Are you sure?') && leaveCommunity(communityData.id)
        else joinCommunity(communityData)
    }

    const getUsersCommunitySnippets = useCallback(async () => {
        setIsLoading(true)
        try {
            const communitySnippetSnap = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            )
            const data = communitySnippetSnap.empty
                ? []
                : (communitySnippetSnap.docs.map(document => ({
                      ...document.data(),
                  })) as TCommunitySnippet[] | [])
            console.log('data:', data)

            setCommunityState(prevState => ({
                ...prevState,
                mySnippets: data,
            }))
        } catch (error) {
            toast.error('Error getting users communities, please refresh.')
            console.log(error)
        }
        setIsLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid])

    useEffect(() => {
        user ? getUsersCommunitySnippets() : setIsLoading(false)
    }, [user, getUsersCommunitySnippets])

    return {
        isLoading,
        communityState,
        communityMembershipToggle,
    }
}

export default useCommunityData
