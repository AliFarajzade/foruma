import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import { TiHome } from 'react-icons/ti'

const Directory: React.FC = () => {
    return (
        <Menu>
            <MenuButton
                ml="2"
                padding="0 6px"
                borderRadius="4"
                _hover={{
                    outline: '1px solid',
                    outlineColor: 'gray.200',
                }}
                mr="2"
            >
                <Flex align="center" justify="space-between">
                    <Flex align="center">
                        <Icon
                            fontSize={24}
                            mr={{ base: 1, md: 2 }}
                            as={TiHome}
                        />
                        <Flex display={{ base: 'none', lg: 'flex' }}>
                            <Text fontWeight="600" mr="1">
                                Home
                            </Text>
                        </Flex>
                    </Flex>

                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>{/* <Communities /> */} Communities</MenuList>
        </Menu>
    )
}

export default Directory
