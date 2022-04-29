import { Flex, Img, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { auth } from '../../firebase/config.firebase'
import RightContent from '../right-content/right-content.component'
import SearchInput from '../search-input/search-input.component'
import Directory from './directory.component'

const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth)

    const router = useRouter()

    useEffect(() => {
        error && toast.error('Failed to authenticate.')
    }, [error])

    return (
        <Flex
            bg="white"
            height="44px"
            padding="6px 12px"
            justify="space-between"
            cursor="pointer"
        >
            <Flex
                onClick={() => router.push('/', '/', { scroll: true })}
                align="center"
                width={{ base: '40px', sm: '40px', md: 'auto' }}
                mr={{ base: 1 }}
            >
                <Img
                    display="block"
                    src="/images/redditFace.svg"
                    height="30px"
                    minWidth={{ base: '30px' }}
                />
                <Img
                    src="/images/redditText.svg"
                    height="46px"
                    display={{ base: 'none', md: 'unset' }}
                />
            </Flex>
            {user && <Directory />}
            <SearchInput user={user} />
            {loading ? <Spinner ml="3" /> : <RightContent user={user} />}
        </Flex>
    )
}

export default Navbar
