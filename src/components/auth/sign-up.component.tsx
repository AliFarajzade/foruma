import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { auth, firestore } from '../../firebase/config.firebase'
import { firebaseErrors } from '../../firebase/error.firebase'
import authModalStateAtom from '../../recoil/atoms/auth-modal.atom'

const SignUp: React.FC = () => {
    const [formValues, setFormValues] = useState<{
        email: string
        password: string
        confirmPassword: string
    }>({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState<string>('')

    const setModalState = useSetRecoilState(authModalStateAtom)

    const [createUserWithEmailAndPassword, userCred, loading, signUpError] =
        useCreateUserWithEmailAndPassword(auth)

    const handleChange = (eventParam: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = eventParam.target

        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (
        evetParam: React.FormEvent<HTMLFormElement>
    ) => {
        evetParam.preventDefault()
        setError('')
        if (formValues.password !== formValues.confirmPassword) {
            setError("Passwords don't match.")
            return
        } else if (formValues.password.length < 8) {
            setError('Password must be at least 8 characters long.')
            return
        }

        await createUserWithEmailAndPassword(
            formValues.email,
            formValues.password
        )
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
            console.log(error)
        }
    }

    useEffect(() => {
        if (!loading && !error && !signUpError && userCred)
            addUserToFirestore(userCred.user)
    }, [loading, userCred, signUpError, error])

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
            <Input
                name="confirmPassword"
                placeholder="Confirm Password"
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
            {error ||
                (signUpError && (
                    <Text
                        color="red"
                        textAlign="center"
                        py="2"
                        fontWeight="400"
                        fontSize="10pt"
                    >
                        {error || firebaseErrors[signUpError.message]}
                    </Text>
                ))}
            <Button width="100%" my="5px" type="submit" isLoading={loading}>
                Sign Up
            </Button>
            <Flex mt="3" fontSize="10pt" justify="center">
                <Text mr="1">Already registerd?</Text>
                <Text
                    onClick={() =>
                        setModalState(prevState => ({
                            ...prevState,
                            view: 'logIn',
                        }))
                    }
                    fontWeight="700"
                    cursor="pointer"
                    color="blue.500"
                >
                    Log In
                </Text>
            </Flex>
        </form>
    )
}

export default SignUp
