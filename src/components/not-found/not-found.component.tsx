import { Button, Flex, Img, Text } from '@chakra-ui/react'
import Link from 'next/link'

interface IProps {
    message: string
}

const NotFound: React.FC<IProps> = ({ message }) => (
    <Flex justify="center" align="center" minHeight="90vh" direction="column">
        <Img src="/images/error-404.png" alt="not found" height="200px" />
        <Text fontSize="20" mt="4">
            {message}
        </Text>
        <Link href="/" prefetch passHref>
            <Button mt="4" padding="25px" fontSize="16">
                Home Page
            </Button>
        </Link>
    </Flex>
)

export default NotFound
