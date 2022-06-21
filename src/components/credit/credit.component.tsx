import { Flex, Link, Text } from '@chakra-ui/react'

const Credit: React.FC = () => {
    return (
        <Flex bg="white" align="center" justify="center" p="4">
            <Text fontSize="14px" textAlign="center" color="gray.600">
                <Link
                    color="#3366BB"
                    href="https://github.com/AliFarajzade/foruma"
                    target="_blank"
                    rel="noreferrer"
                >
                    Foruma
                </Link>{' '}
                | Built with ❤ by{' '}
                <Link
                    color="#3366BB"
                    href="https://github.com/AliFarajzade"
                    target="_blank"
                    rel="noreferrer"
                >
                    &copy; Ali Farajzade 2022
                </Link>
            </Text>
        </Flex>
    )
}

export default Credit
