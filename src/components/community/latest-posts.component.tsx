import { Flex, Skeleton, Text } from '@chakra-ui/react'
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import 'swiper/css'
import 'swiper/css/pagination'
import { firestore } from '../../firebase/config.firebase'
import { TPost } from '../../types/post.types'
import LatestsPostsSlider from './latest-posts-slider.component'

const LatestsPosts = () => {
    const [posts, setPosts] = useState<TPost[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getPosts = async () => {
        setIsLoading(true)
        const postsRef = collection(firestore, 'posts')
        const postsQuery = query(
            postsRef,
            where('mediaType', '==', 'image'),
            orderBy('createdAt', 'desc'),
            limit(4)
        )

        try {
            const postsSnap = await getDocs(postsQuery)
            const posts = postsSnap.empty
                ? []
                : (postsSnap.docs.map(docSnap => ({
                      ID: docSnap.id,
                      ...docSnap.data(),
                  })) as TPost[])

            setPosts(posts)
        } catch (error) {
            toast.error('Cannot get the posts at the moment.')
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <Flex py="4" mx="auto" direction="column" width="95%" maxWidth="990px">
            <Text mb={3} fontWeight={700}>
                Latest Posts
            </Text>

            {isLoading ? (
                <Flex
                    width="100%"
                    align="center"
                    gap={2}
                    justify="space-between"
                    direction="row"
                >
                    {[1, 2, 3, 4].map(key => (
                        <Skeleton key={key} height="200px" flex="1" />
                    ))}
                </Flex>
            ) : (
                <Flex gap="2">
                    <LatestsPostsSlider posts={posts} />
                </Flex>
            )}
        </Flex>
    )
}

export default LatestsPosts
