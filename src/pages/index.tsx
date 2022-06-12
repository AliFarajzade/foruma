import { Box, Button, Stack } from '@chakra-ui/react'
import {
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter,
} from 'firebase/firestore'
import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { v4 as uuid } from 'uuid'
import CommunityPageLayout from '../components/layout/community-layout.component'
import NoPosts from '../components/post/no-posts.component'
import PostItem from '../components/post/post-item.component'
import PostSkeleton from '../components/post/post-skeleton.component'
import { auth, firestore } from '../firebase/config.firebase'
import usePosts from '../hooks/use-posts.hook'
import { TPost } from '../types/post.types'

const LIMIT = 10

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, loadingUser] = useAuthState(auth)
    const [lastSnap, setLastSnap] =
        useState<QueryDocumentSnapshot<DocumentData> | null>(null)
    const [page, setPage] = useState<number>(1)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    const {
        setPostsState,
        postsState,
        handleDeletePost,
        handlePostVote,
        handleSelectPost,
        votesIsLoading,
    } = usePosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoedSnap = useMemo(() => lastSnap, [page])

    const buildUserHomeFeed = async () => {}

    const buildNoUserHomeFeed = useCallback(async () => {
        if (user?.uid) return
        setIsLoading(true)
        const postsRef = collection(firestore, 'posts')
        let postsQuery

        if (memoedSnap)
            postsQuery = query(
                postsRef,
                orderBy('voteStatus', 'desc'),
                startAfter(memoedSnap),
                limit(LIMIT)
            )
        else
            postsQuery = query(
                postsRef,
                orderBy('voteStatus', 'desc'),
                limit(LIMIT)
            )

        try {
            const postsSnap = await getDocs(postsQuery)
            setIsEmpty(postsSnap.empty)
            const posts = postsSnap.empty
                ? []
                : (postsSnap.docs.map(docSnap => ({
                      ID: docSnap.id,
                      ...docSnap.data(),
                  })) as TPost[])

            setPostsState(prevState => ({
                ...prevState,
                posts: [...prevState.posts, ...posts],
            }))
            setLastSnap(postsSnap.docs[postsSnap.docs.length - 1])
        } catch (error) {
            toast.error('Cannot get posts from database.')
            console.log(error)
        }
        setIsLoading(false)
    }, [setPostsState, user?.uid, memoedSnap])

    const getUserVotes = async () => {}

    useEffect(() => {
        if (!user?.uid && !loadingUser) buildNoUserHomeFeed()
    }, [user?.uid, loadingUser, buildNoUserHomeFeed, page])

    return (
        <CommunityPageLayout>
            <>
                <Stack spacing={2}>
                    {isLoading ? (
                        Array(5)
                            .fill(' ')
                            .map(_ => <PostSkeleton key={uuid()} />)
                    ) : postsState.posts.length ? (
                        postsState.posts.map(postObj => (
                            <PostItem
                                key={uuid()}
                                post={postObj}
                                isUserTheCreator={
                                    user?.uid === postObj.creatorID
                                }
                                userVoteValue={
                                    postsState.postsVotes.find(
                                        ({ postID }) => postID === postObj.ID
                                    )?.voteValue
                                }
                                handleDeletePost={handleDeletePost}
                                handlePostVote={handlePostVote}
                                votesIsLoading={votesIsLoading}
                                handleSelectPost={handleSelectPost}
                            />
                        ))
                    ) : (
                        <NoPosts />
                    )}

                    <Box mx="auto" textAlign="center">
                        <Button
                            onClick={() => setPage(prevState => prevState + 1)}
                            disabled={isEmpty}
                            variant="outline"
                            bg="white"
                            width="50%"
                        >
                            {isEmpty ? 'No more posts' : 'Load more posts'}
                        </Button>
                    </Box>
                </Stack>
            </>
            <></>
        </CommunityPageLayout>
    )
}

export default Home
