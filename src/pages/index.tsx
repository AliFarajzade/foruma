import { Stack } from '@chakra-ui/react'
import {
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import safeJsonStringify from 'safe-json-stringify'
import { v4 as uuid } from 'uuid'
import CommunityPageLayout from '../components/layout/community-layout.component'
import NoPosts from '../components/post/no-posts.component'
import PostItem from '../components/post/post-item.component'
import PostSkeleton from '../components/post/post-skeleton.component'
import { auth, firestore } from '../firebase/config.firebase'
import usePosts from '../hooks/use-posts.hook'
import { TPost, TPostVote } from '../types/post.types'

export const getServerSideProps = async () => {
    const postsRef = collection(firestore, 'posts')
    const postQuery = query(postsRef, orderBy('voteStatus', 'desc'), limit(2))

    try {
        const postsSnap = await getDocs(postQuery)
        const posts = postsSnap.empty
            ? []
            : JSON.parse(
                  safeJsonStringify(
                      postsSnap.docs.map(docSnap => ({
                          ID: docSnap.id,
                          ...docSnap.data(),
                      }))
                  )
              )
        return {
            props: {
                serverPosts: posts,
                lastSnapDoc: JSON.parse(
                    safeJsonStringify(postsSnap.docs[postsSnap.docs.length - 1])
                ),
            },
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

interface IProps {
    serverPosts: TPost[]
    lastSnapDoc: QueryDocumentSnapshot<DocumentData>
}

const Home: NextPage<IProps> = ({ serverPosts, lastSnapDoc }) => {
    // 1) Get posts votes

    // 2) Get new posts + pagination

    const {
        setPostsState,
        postsState,
        handleDeletePost,
        handlePostVote,
        handleSelectPost,
    } = usePosts()
    const [user, userLoading] = useAuthState(auth)
    const [isSettingRecoilState, setIsSettingRecoilState] =
        useState<boolean>(true)
    const [votesIsLoading, setVotesIsLoading] = useState<boolean>(false)

    const getPostsVotes = async () => {
        if (!user || postsState.posts.length === 0) return
        setVotesIsLoading(true)
        const postsIDs = postsState.posts.map(postObi => postObi.ID)
        const postsVotesRef = collection(
            firestore,
            `users/${user.uid}/postsVotes`
        )
        const postsVotesQuery = query(
            postsVotesRef,
            where('postID', 'in', postsIDs)
        )

        try {
            const postsVotesSnap = await getDocs(postsVotesQuery)
            const postsVotes = postsVotesSnap.empty
                ? []
                : (postsVotesSnap.docs.map(docSnap => ({
                      ID: docSnap.id,
                      ...docSnap.data(),
                  })) as TPostVote[])

            setPostsState(prevState => ({
                ...prevState,
                postsVotes,
            }))
        } catch (error) {
            toast.error('Cannot get posts votes at the moment.')
            console.log(error)
        }
        setVotesIsLoading(false)
    }

    useEffect(() => {
        setIsSettingRecoilState(true)
        setPostsState(prevState => ({ ...prevState, posts: serverPosts }))
        setIsSettingRecoilState(false)

        return () => {
            setPostsState(prevState => ({
                ...prevState,
                posts: [],
                postsVotes: [],
            }))
        }
    }, [])

    useEffect(() => {
        if (user && postsState.posts.length !== 0) getPostsVotes()
    }, [user, postsState.posts])

    return (
        <CommunityPageLayout>
            <Stack spacing={6}>
                {isSettingRecoilState ? (
                    [1, 2, 3, 4, 5].map(key => <PostSkeleton key={key} />)
                ) : postsState.posts.length !== 0 ? (
                    postsState.posts.map(postObj => (
                        <PostItem
                            key={uuid()}
                            post={postObj}
                            isUserTheCreator={user?.uid === postObj.creatorID}
                            userVoteValue={
                                postsState.postsVotes.find(
                                    ({ postID }) => postID === postObj.ID
                                )?.voteValue
                            }
                            handleDeletePost={handleDeletePost}
                            handlePostVote={handlePostVote}
                            // TODO: FIX
                            votesIsLoading={votesIsLoading}
                            handleSelectPost={handleSelectPost}
                        />
                    ))
                ) : (
                    <NoPosts />
                )}
            </Stack>
            <></>
        </CommunityPageLayout>
    )
}

export default Home
