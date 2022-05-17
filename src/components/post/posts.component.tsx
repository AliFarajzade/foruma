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
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { v4 as uuid } from 'uuid'
import { auth, firestore } from '../../firebase/config.firebase'
import usePosts from '../../hooks/use-posts.hook'
import { TPost } from '../../types/post.types'
import PostItem from './post-item.component'

const Posts: React.FC = () => {
    const [user] = useAuthState(auth)

    const { query: routeQuery } = useRouter()

    const { postsState, setPostsState } = usePosts()

    const getPosts = async () => {
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
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <Stack spacing={2}>
            {postsState.posts.map(postObj => (
                <PostItem
                    key={uuid()}
                    post={postObj}
                    isUserTheCreator={user?.uid === postObj.creatorID}
                    userVoteValue={1}
                />
            ))}
        </Stack>
    )
}

export default Posts
