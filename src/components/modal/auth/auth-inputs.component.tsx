import { Flex } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import authModalStateAtom from '../../../recoil/atoms/auth-modal.atom'
import LogIn from '../../auth/log-in.component'
import SignUp from '../../auth/sign-up.component'

const AuthInputs: React.FC = () => {
    const modalState = useRecoilValue(authModalStateAtom)
    return (
        <Flex my="6" direction="column" align="center" width="100%">
            {modalState.view === 'logIn' && <LogIn />}
            {modalState.view === 'signUp' && <SignUp />}
        </Flex>
    )
}

export default AuthInputs
