import { Button, Flex, Img, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { auth, firestore } from '../../firebase/config.firebase'
import { firebaseErrors } from '../../firebase/error.firebase'

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, userCred, loading, oAuthError] =
        useSignInWithGoogle(auth)
    const [, setError] = useState<string>('')

    const handleGoogleOAuth = async () => {
        await signInWithGoogle()
        toast.success('You got registerd!')
    }

    const addUserToFirestore = async (user: User) => {
        try {
            await setDoc(doc(firestore, 'users', user.uid), {
                displayName: user.displayName,
                email: user.email,
                providerData: user.providerData,
                uid: user.uid,
            })
        } catch (error: any) {
            setError(error.message)
            toast.error('Something went wrong.')
            console.log(error)
        }
    }

    useEffect(() => {
        if (!loading && !oAuthError && userCred)
            addUserToFirestore(userCred.user)
    }, [loading, userCred, oAuthError])

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
