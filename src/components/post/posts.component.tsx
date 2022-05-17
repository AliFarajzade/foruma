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
import { firestore } from '../../firebase/config.firebase'
import { TPost } from '../../types/post.types'

const Posts: React.FC = () => {
    const { query: routeQuery } = useRouter()

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
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return <h1>Posts</h1>
}

export default Posts
