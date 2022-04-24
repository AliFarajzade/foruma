import { Flex, Img, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { auth } from '../../firebase/config.firebase'
import RightContent from '../right-content/right-content.component'
import SearchInput from '../search-input/search-input.component'

const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        error && toast.error('Failed to authenticate.')
    }, [error])

    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Img
                    src="/images/redditFace.svg"
                    height="30px"
                    mr={{ base: '3', md: 'unset' }}
                />
                <Img
                    src="/images/redditText.svg"
                    height="46px"
                    mr={2}
                    display={{ base: 'none', md: 'unset' }}
                />
            </Flex>
            <SearchInput />
            {loading ? <Spinner ml="3" /> : <RightContent user={user} />}
        </Flex>
    )
}

export default Navbar
