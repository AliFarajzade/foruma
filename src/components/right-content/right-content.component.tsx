import { Flex, Button } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import { auth } from '../../firebase/config.firebase'
import AuthModal from '../modal/auth/auth-modal.component'
import NavbarIcons from '../navbar/navbar-icons.component'
import AuthButtons from './auth-buttons.component'

type IProps = {
    user: User | null | undefined
}

const RightContent: React.FC<IProps> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user ? <NavbarIcons /> : <AuthButtons />}
            </Flex>
        </>
    )
}

export default RightContent
