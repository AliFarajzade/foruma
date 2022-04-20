import { Flex } from '@chakra-ui/react'
import AuthModal from '../modal/auth/auth-modal.component'
import AuthButtons from './auth-buttons.component'

const RightContent: React.FC = () => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                <AuthButtons />
            </Flex>
        </>
    )
}

export default RightContent
