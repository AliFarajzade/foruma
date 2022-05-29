import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import { CgProfile } from 'react-icons/cg'
import { FaRedditSquare } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'
import { MdOutlineLogin } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { useSetRecoilState } from 'recoil'
import { auth } from '../../firebase/config.firebase'
import authModalStateAtom from '../../recoil/atoms/auth-modal.atom'
import communitySnippetStateAtom from '../../recoil/atoms/community.atom'

type IProps = {
    user: User | undefined | null
}

const NavbarDropDown: React.FC<IProps> = ({ user }) => {
    const setCommunitySnippetState = useSetRecoilState(
        communitySnippetStateAtom
    )
    const setModalState = useSetRecoilState(authModalStateAtom)

    const logOut = async () => {
        await signOut(auth)
        setCommunitySnippetState(prevState => ({
            ...prevState,
            mySnippets: [],
        }))
    }

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
            >
                <Flex align="center">
                    <Flex align="center">
                        {user ? (
                            <>
                                <Icon
                                    as={FaRedditSquare}
                                    fontSize="24"
                                    mr="1"
                                    color="gray.300"
                                />
                                <Flex
                                    direction="column"
                                    display={{ base: 'none', lg: 'flex' }}
                                    fontSize="8pt"
                                    align="flex-start"
                                    mr="5"
                                >
                                    <Text fontWeight="700">
                                        {user?.displayName ||
                                            user.email?.split('@')[0]}
                                    </Text>
                                    <Flex>
                                        <Icon
                                            as={IoSparkles}
                                            color="brand.primary"
                                            mr="1"
                                        />
                                        <Text color="gray.400">1 karma</Text>
                                    </Flex>
                                </Flex>
                            </>
                        ) : (
                            <Icon
                                as={VscAccount}
                                fontSize="24"
                                color="gray.400"
                            />
                        )}
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                {user ? (
                    <>
                        <MenuItem
                            fontSize="10pt"
                            fontWeight="700"
                            _hover={{ bg: 'blue.400', color: 'white' }}
                        >
                            <Flex align="center">
                                <Icon fontSize="20" as={CgProfile} mr="2" />
                                Profile
                            </Flex>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                            onClick={() => logOut()}
                            fontSize="10pt"
                            fontWeight="700"
                            _hover={{ bg: 'blue.400', color: 'white' }}
                        >
                            <Flex align="center">
                                <Icon
                                    fontSize="20"
                                    as={MdOutlineLogin}
                                    mr="2"
                                />
                                Log Out
                            </Flex>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem
                        onClick={() =>
                            setModalState(prevState => ({
                                ...prevState,
                                view: 'logIn',
                                open: true,
                            }))
                        }
                        fontSize="10pt"
                        fontWeight="700"
                        _hover={{ bg: 'blue.400', color: 'white' }}
                    >
                        <Flex align="center">
                            <Icon fontSize="20" as={MdOutlineLogin} mr="2" />
                            Register / Login
                        </Flex>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    )
}

export default NavbarDropDown
