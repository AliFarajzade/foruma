import { Button, Flex, Img } from '@chakra-ui/react'

const OAuthButtons = () => {
    return (
        <Flex mb="6" direction="column" justify="center" align="center">
            <Button
                _hover={{ bg: 'red.500', color: 'white' }}
                variant="oauth"
                mb="2"
            >
                <Img src="/images/googlelogo.png" height="20px" mr="2" />
                Continue with Google
            </Button>
            <Button>Some other provider</Button>
        </Flex>
    )
}

export default OAuthButtons
