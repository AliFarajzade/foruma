import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Flex,
    Icon,
    Img,
    Menu,
    MenuButton,
    MenuList,
    Text,
} from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import { TiHome } from 'react-icons/ti'
import useDirectory from '../../hooks/use-directory.hook'
import Communities from './communities.component'

const Directory: React.FC = () => {
    const { directoryState, toggleMenuOpen } = useDirectory()

    return (
        <Menu isOpen={directoryState.isOpen}>
            <MenuButton
                ml="2"
                padding="0 6px"
                borderRadius="4"
                _hover={{
                    outline: '1px solid',
                    outlineColor: 'gray.200',
                }}
                mr="2"
                onClick={toggleMenuOpen}
            >
                <Flex align="center" justify="space-between">
                    <Flex align="center">
                        {directoryState.selectedMenuItem.imageURL ? (
                            <Img
                                src={directoryState.selectedMenuItem.imageURL}
                                alt={directoryState.selectedMenuItem.name}
                                boxSize={30}
                                borderRadius="full"
                                mr={{ base: 1, md: 2 }}
                            />
                        ) : directoryState.selectedMenuItem.name === 'Home' ? (
                            <Icon
                                fontSize={24}
                                mr={{ base: 1, md: 2 }}
                                as={TiHome}
                            />
                        ) : (
                            <Icon
                                fontSize={30}
                                mr={{ base: 1, md: 2 }}
                                color="blue.500"
                                as={FaReddit}
                            />
                        )}
                        <Flex display={{ base: 'none', lg: 'flex' }}>
                            <Text fontWeight="600" mr="1">
                                {directoryState.selectedMenuItem.name}
                            </Text>
                        </Flex>
                    </Flex>

                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities />
            </MenuList>
        </Menu>
    )
}

export default Directory
