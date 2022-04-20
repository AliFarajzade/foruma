import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import authModalState from '../../../recoil/atoms/auth-modal.atom'

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)

    const handleClose = () => {
        setModalState(prevState => ({
            ...prevState,
            open: false,
        }))
    }

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{/* Content */}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal
