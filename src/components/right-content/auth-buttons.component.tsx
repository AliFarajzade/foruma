import { Button } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import authModalState from '../../recoil/atoms/auth-modal.atom'

const AuthButtons: React.FC = () => {
    const setModalState = useSetRecoilState(authModalState)

    return (
        <>
            <Button
                variant="outline"
                height="28px"
                display={{ base: 'none', sm: 'inline-block' }}
                width={{ base: '70px', md: '110px' }}
                mr="2"
                onClick={() => setModalState({ open: true, view: 'logIn' })}
            >
                Log In
            </Button>
            <Button
                height="28px"
                display={{ base: 'none', sm: 'inline-block' }}
                width={{ base: '70px', md: '110px' }}
                onClick={() => setModalState({ open: true, view: 'signUp' })}
            >
                Sign Up
            </Button>
        </>
    )
}

export default AuthButtons
