import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { auth } from '../../../firebase/config.firebase'
import authModalStateAtom from '../../../recoil/atoms/auth-modal.atom'
import OAuthButtons from '../../auth/oauth-buttons.component'
import ResetPassword from '../../auth/reset-password.component'
import AuthInputs from './auth-inputs.component'

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalStateAtom)

    const handleClose = () => {
        setModalState(prevState => ({
            ...prevState,
            open: false,
        }))
    }

    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user) handleClose()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        {modalState.view === 'logIn' && 'Login'}
                        {modalState.view === 'signUp' && 'Sign Up'}
                        {modalState.view === 'resetPassword' &&
                            'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        pb="6"
                    >
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            width="70%"
                        >
                            {modalState.view === 'logIn' ||
                            modalState.view === 'signUp' ? (
                                <>
                                    <OAuthButtons />
                                    <Text
                                        color="gray.500"
                                        fontWeight="700"
                                        textAlign="center"
                                    >
                                        OR
                                    </Text>
                                    <AuthInputs />
                                </>
                            ) : (
                                <ResetPassword />
                            )}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal
