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
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { v4 as uuid } from 'uuid'
import { auth, firestore } from '../../firebase/config.firebase'
import usePosts from '../../hooks/use-posts.hook'
import { TPost } from '../../types/post.types'
import NoPosts from './no-posts.component'
import PostItem from './post-item.component'
import PostSkeleton from './post-skeleton.component'

const Posts: React.FC = () => {
    const [user] = useAuthState(auth)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { query: routeQuery } = useRouter()

    const { postsState, setPostsState } = usePosts()

    const getPosts = async () => {
        setIsLoading(true)
        const collectionRef = collection(firestore, 'posts')

        const postsQuery = query(
            collectionRef,
            where('communityID', '==', routeQuery.communityID),
            orderBy('createdAt', 'desc'),
            limit(10)
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
    }

    useEffect(() => {
        getPosts()
    }, [])

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
                        userVoteValue={1}
                        handleDeletePost={handleDeletePost}
                    />
                ))
            ) : (
                <NoPosts />
            )}
        </Stack>
    )
}

export default Posts
