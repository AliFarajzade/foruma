import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'

const PostSkeleton: React.FC = () => {
    return (
        <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
            <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <Skeleton mt="4" height="200px" />
        </Box>
    )
}
export default PostSkeleton
