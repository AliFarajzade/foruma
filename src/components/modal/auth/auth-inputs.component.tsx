import { Flex } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import authModalState from '../../../recoil/atoms/auth-modal.atom'
import LogIn from '../../auth/log-in.component'

const AuthInputs = () => {
    const modalState = useRecoilValue(authModalState)
    return (
        <Flex direction="column" align="center" width="100%">
            {modalState.view === 'logIn' && <LogIn />}
            {/* {modalState.view === 'signUp' && <SignUp />} */}
        </Flex>
    )
}

export default AuthInputs
