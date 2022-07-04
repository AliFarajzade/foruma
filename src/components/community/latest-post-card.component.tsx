import { Flex, Img, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import usePosts from '../../hooks/use-posts.hook'
import { TPost } from '../../types/post.types'

interface IProps {
    post: TPost
}

const LatestPostCard: React.FC<IProps> = ({ post }) => {
    const router = useRouter()
    const { handleSelectPost } = usePosts()

    return (
        <Flex
            borderRadius={4}
            width="100%"
            height="220px"
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPos="center"
            bgImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url(${post.mediaURL})`}
            justify="flex-end"
            px="4"
            pb="4"
            color="white"
            direction="column"
            transition="filter 200ms ease"
            cursor="pointer"
            _hover={{ filter: 'brightness(115%)' }}
            onClick={() => {
                router.push(`/r/${post.communityID}/comments/${post.ID}`)
                handleSelectPost(post)
            }}
        >
            <Text fontSize="1.1rem" fontWeight={700} mb={1}>
                {post.title}
            </Text>
            <Flex align="center" gap={2}>
                {post.communityImageURL && (
                    <Img
                        borderRadius="50%"
                        src={post.communityImageURL}
                        width="25px"
                        height="25px"
                    />
                )}
                <Text fontSize=".9rem">By u/{post.creatorDisplayName}</Text>
            </Flex>
        </Flex>
    )
}

export default LatestPostCard
