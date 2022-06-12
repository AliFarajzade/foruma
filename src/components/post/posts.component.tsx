import { Stack } from '@chakra-ui/react'
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { v4 as uuid } from 'uuid'
import { auth, firestore } from '../../firebase/config.firebase'
import usePosts from '../../hooks/use-posts.hook'
import { TCommunity } from '../../types/community.types'
import { TPost } from '../../types/post.types'
import NoPosts from './no-posts.component'
import PostItem from './post-item.component'
import PostSkeleton from './post-skeleton.component'

interface IProps {
    communityData: TCommunity
}

const Posts: React.FC<IProps> = ({ communityData }) => {
    // TODO: Add pagination

    const [user] = useAuthState(auth)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const { query: routeQuery } = useRouter()

    const {
        postsState,
        setPostsState,
        handleDeletePost,
        handlePostVote,
        votesIsLoading,
        handleSelectPost,
    } = usePosts()

    const getPosts = useCallback(async () => {
        setIsLoading(true)
        const postsRef = collection(firestore, 'posts')

        const postsQuery = query(
            postsRef,
            where('communityID', '==', routeQuery.communityID),
            orderBy('createdAt', 'desc'),
            limit(20)
        )

        try {
            const postsSnap = await getDocs(postsQuery)
            const posts: TPost[] = postsSnap.docs.map(postObj => ({
                ID: postObj.id,
                ...(postObj.data() as Omit<TPost, 'ID'>),
            }))
            setPostsState(prevState => ({
                ...prevState,
                posts,
            }))
        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }, [routeQuery.communityID, setPostsState])

    useEffect(() => {
        getPosts()
    }, [communityData, getPosts])

    return (
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
                        isUserTheCreator={user?.uid === postObj.creatorID}
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
        </Stack>
    )
}

export default Posts
