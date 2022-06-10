import {
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    writeBatch,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { auth, firestore } from '../firebase/config.firebase'
import authModalStateAtom from '../recoil/atoms/auth-modal.atom'
import communitySnippetStateAtom from '../recoil/atoms/community.atom'
import { TCommunity, TCommunitySnippet } from '../types/community.types'

const useCommunityData = () => {
    const {
        query: { communityID },
    } = useRouter()

    const [user] = useAuthState(auth)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [communityState, setCommunityState] = useRecoilState(
        communitySnippetStateAtom
    )

    const [, setModalState] = useRecoilState(authModalStateAtom)

    const getCommunityData = useCallback(
        async (communityID: string) => {
            console.log('Hey')
            const communityRef = doc(firestore, 'communities', communityID)
            try {
                const communitySnap = await getDoc(communityRef)

                if (communitySnap.exists()) {
                    setCommunityState(prevState => ({
                        ...prevState,
                        currentCommunity: {
                            id: communitySnap.id,
                            ...communitySnap.data(),
                        } as TCommunity,
                    }))
                }
            } catch (error) {
                toast.error('Cannot get community data.')
                console.log(error)
            }
        },
        [setCommunityState]
    )

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
        if (!user) {
            setIsLoading(false)
            setCommunityState(prevState => ({
                ...prevState,
                mySnippets: [],
            }))
        } else getUsersCommunitySnippets()
    }, [user, getUsersCommunitySnippets])

    useEffect(() => {
        if (!communityState.currentCommunity && communityID)
            getCommunityData(communityID as string)
    }, [communityID, communityState.currentCommunity, getCommunityData])

    return {
        isLoading,
        communityState,
        communityMembershipToggle,
    }
}

export default useCommunityData
