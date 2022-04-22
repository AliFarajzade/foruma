import { Flex, Button } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import { auth } from '../../firebase/config.firebase'
import AuthModal from '../modal/auth/auth-modal.component'
import AuthButtons from './auth-buttons.component'

type IProps = {
    user: User | null | undefined
}

const RightContent: React.FC<IProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user ? (
                    <Button
                        onClick={() => signOut(auth)}
                        height="28px"
                        display={{ base: 'none', sm: 'inline-block' }}
                        width={{ base: 'fit-content', md: '110px' }}
                    >
                        Sign Out
                    </Button>
                ) : (
                    <AuthButtons />
                )}
            </Flex>
        </>
    )
}

export default RightContent
