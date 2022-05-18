import { Img, Stack, Text } from '@chakra-ui/react'

const NoPosts: React.FC = () => (
    <Stack
        bg="gray.50"
        padding="20px"
        align="center"
        borderRadius="5px"
        userSelect="none"
    >
        <Img width="30%" src="/images/image-not-found.svg" alt="no posts" />
        <Text fontWeight="600" fontSize="12pt">
            There are no posts in here.
        </Text>
    </Stack>
)

export default NoPosts
