import { Box, Flex, Img, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { useResetRecoilState } from 'recoil'
import { auth } from '../../firebase/config.firebase'
import directoryMenuStateAtom from '../../recoil/atoms/directory.atom'
import RightContent from '../right-content/right-content.component'
import SearchInput from '../search-input/search-input.component'
import Directory from './directory.component'

const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth)

    const resetDirectoryState = useResetRecoilState(directoryMenuStateAtom)

    const router = useRouter()

    useEffect(() => {
        error && toast.error('Failed to authenticate.')
    }, [error])

    return (
        <Flex
            bg="white"
            height="50px"
            padding="6px 12px"
            justify="space-between"
            cursor="pointer"
        >
            <Flex
                onClick={() => {
                    router.push('/', '/', { scroll: true })
                    resetDirectoryState()
                }}
                align="center"
                width={{ base: '46PX', sm: '46PX', md: 'auto' }}
                mr={{ base: '-10px', md: 1 }}
                flexShrink="0"
            >
                <Img
                    src="/images/foruma-f.png"
                    width="26px"
                    top="0"
                    left="0"
                    flexShrink="0"
                    mr={{ base: 0, md: 2 }}
                />
                <Box
                    fontWeight={600}
                    bgImage="linear-gradient(to right, #ff3c00, #ff8e6b)"
                    bgClip="text"
                    fontSize="1.3rem"
                    display={{ base: 'none', md: 'unset' }}
                    transform="translate(0, 1px)"
                >
                    Foruma
                </Box>
            </Flex>
            {user && <Directory />}
            <SearchInput user={user} />
            {loading ? <Spinner ml="3" /> : <RightContent user={user} />}
        </Flex>
    )
}

export default Navbar
