import { Button } from '@chakra-ui/react'

const AuthButtons: React.FC = () => {
    return (
        <>
            <Button
                variant="outline"
                height="28px"
                display={{ base: 'none', sm: 'inline-block' }}
                width={{ base: '70px', md: '110px' }}
                mr="2"
            >
                Log In
            </Button>
            <Button
                height="28px"
                display={{ base: 'none', sm: 'inline-block' }}
                width={{ base: '70px', md: '110px' }}
            >
                Sign Up
            </Button>
        </>
    )
}

export default AuthButtons
