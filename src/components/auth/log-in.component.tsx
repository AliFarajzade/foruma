import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'
import { auth } from '../../firebase/config.firebase'
import authModalState from '../../recoil/atoms/auth-modal.atom'
import { firebaseErrors } from '../../firebase/error.firebase'
import toast from 'react-hot-toast'

const LogIn: React.FC = () => {
    const [formValues, setFormValues] = useState<{
        email: string
        password: string
    }>({
        email: '',
        password: '',
    })

    const [signInWithEmailAndPassword, user, loading, logInError] =
        useSignInWithEmailAndPassword(auth)

    const setModalState = useSetRecoilState(authModalState)

    const handleChange = (eventParam: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = eventParam.target

        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (eventParam: React.FormEvent<HTMLFormElement>) => {
        eventParam.preventDefault()
        signInWithEmailAndPassword(formValues.email, formValues.password)
    }

    useEffect(() => {
        if (!loading && !logInError && user)
            toast.success('You are now logged in.')
    }, [loading, logInError, user])

    return (
        <form onSubmit={handleSubmit}>
            <Input
                name="email"
                placeholder="Email"
                type="email"
                mb={2}
                onChange={handleChange}
                required
                fontSize="12pt"
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                }}
                _focus={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                    outline: 'none',
                }}
                bg="gray.50"
            />

            <Input
                name="password"
                placeholder="Password"
                type="password"
                mb={3}
                onChange={handleChange}
                required
                fontSize="12pt"
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                }}
                _focus={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                    outline: 'none',
                }}
                bg="gray.50"
            />

            {logInError && (
                <Text
                    color="red"
                    textAlign="center"
                    py="2"
                    fontWeight="400"
                    fontSize="10pt"
                >
                    {firebaseErrors[logInError.message]}
                </Text>
            )}

            <Button width="100%" isLoading={loading} my="5px" type="submit">
                Log In
            </Button>
            <Flex mt="3" fontSize="10pt" justify="center">
                <Text mr="1">Forgot your password?</Text>
                <Text
                    onClick={() =>
                        setModalState(prevState => ({
                            ...prevState,
                            view: 'resetPassword',
                        }))
                    }
                    fontWeight="700"
                    cursor="pointer"
                    color="blue.500"
                >
                    Reset password
                </Text>
            </Flex>
            <Flex mt="3" fontSize="10pt" justify="center">
                <Text mr="1">New here?</Text>
                <Text
                    onClick={() =>
                        setModalState(prevState => ({
                            ...prevState,
                            view: 'signUp',
                        }))
                    }
                    fontWeight="700"
                    cursor="pointer"
                    color="blue.500"
                >
                    Sign up
                </Text>
            </Flex>
        </form>
    )
}

export default LogIn
