import { Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import AuthModal from '../modal/auth/auth-modal.component'
import NavbarDropDown from '../navbar/navbar-dropdown.component'
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
                {/* {user && <NavbarDropDown />} */}
                <NavbarDropDown user={user} />
            </Flex>
        </>
    )
}

export default RightContent
