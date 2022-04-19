import { Flex } from '@chakra-ui/react'
import AuthButtons from './auth-buttons.component'

const RightContent: React.FC = () => {
    return (
        <>
            {/* <AuthModal /> */}
            <Flex justify="center" align="center">
                <AuthButtons />
            </Flex>
        </>
    )
}

export default RightContent
