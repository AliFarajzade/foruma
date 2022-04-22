import { Button, Flex, Img, Text } from '@chakra-ui/react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/config.firebase'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { firebaseErrors } from '../../firebase/error.firebase'

const OAuthButtons = () => {
    const [signInWithGoogle, user, loading, oAuthError] =
        useSignInWithGoogle(auth)

    const handleGoogleOAuth = () => {
        signInWithGoogle()
    }

    useEffect(() => {
        if (!loading && !oAuthError && user) toast.success('You got registerd!')
    }, [loading, user, oAuthError])

    return (
        <Flex mb="6" direction="column" justify="center" align="center">
            <Button
                width="100%"
                isLoading={loading}
                onClick={handleGoogleOAuth}
                _hover={{ bg: 'red.500', color: 'white' }}
                variant="oauth"
                mb="2"
            >
                <Img src="/images/googlelogo.png" height="20px" mr="2" />
                Continue with Google
            </Button>
            <Button width="100%" disabled={loading} variant="oauth" mb="2">
                Some other provider
            </Button>
            {oAuthError && (
                <Text
                    color="red"
                    textAlign="center"
                    py="2"
                    fontWeight="400"
                    fontSize="10pt"
                >
                    {firebaseErrors[oAuthError.message]}
                </Text>
            )}
        </Flex>
    )
}

export default OAuthButtons
