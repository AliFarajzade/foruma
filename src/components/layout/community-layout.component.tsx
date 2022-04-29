import { Flex } from '@chakra-ui/react'

interface IProps {
    children: React.ReactChild[]
}

const CommunityPageLayout: React.FC<IProps> = ({ children }) => {
    return (
        <Flex justify="center" p="16px 0px">
            <Flex justify="center" width="95%" maxWidth="860px">
                <Flex
                    direction="column"
                    width={{ base: '100%', md: '65%' }}
                    mr={{ base: 0, md: 6 }}
                >
                    {children[0]}
                </Flex>
                <Flex
                    direction="column"
                    display={{ base: 'none', md: 'unset' }}
                    flexGrow={1}
                >
                    {children[1]}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CommunityPageLayout
