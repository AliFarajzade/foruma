import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { BsDot, BsReddit } from 'react-icons/bs'
import { useSetRecoilState } from 'recoil'
import { auth } from '../../firebase/config.firebase'
import { firebaseErrors } from '../../firebase/error.firebase'
import authModalStateAtom from '../../recoil/atoms/auth-modal.atom'

const ResetPassword: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalStateAtom)
    const [email, setEmail] = useState('')
    const [processFinished, setProcessFinished] = useState<boolean>(false)
    const [sendPasswordResetEmail, sending, resetError] =
        useSendPasswordResetEmail(auth)

    const onSubmit = async (eventParam: React.FormEvent<HTMLFormElement>) => {
        eventParam.preventDefault()
        setProcessFinished(false)
        await sendPasswordResetEmail(email)
        setProcessFinished(true)
    }

    useEffect(() => {
        if (!resetError && !sending && processFinished)
            toast.success('Check your email.')
    }, [resetError, sending, processFinished])

    return (
        <Flex direction="column" alignItems="center" width="100%">
            <Icon as={BsReddit} color="brand.primary" fontSize={40} mb={2} />
            <Text fontWeight={700} mb={2}>
                Reset your password
            </Text>

            <Text fontSize="sm" textAlign="center" mb={2}>
                Enter the email associated with your account and {"we'll"} send
                you a reset link
            </Text>
            <form onSubmit={onSubmit} style={{ width: '100%' }}>
                <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={event => setEmail(event.target.value)}
                    mb={2}
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
                {resetError && (
                    <Text textAlign="center" fontSize="10pt" color="red">
                        {firebaseErrors[resetError.message]}
                    </Text>
                )}
                <Button
                    width="100%"
                    height="36px"
                    mb={2}
                    mt={2}
                    type="submit"
                    isLoading={sending}
                >
                    Reset Password
                </Button>
            </form>

            <Flex
                alignItems="center"
                fontSize="9pt"
                color="blue.500"
                fontWeight={700}
                cursor="pointer"
            >
                <Text
                    onClick={() =>
                        setAuthModalState(prevState => ({
                            ...prevState,
                            view: 'logIn',
                        }))
                    }
                >
                    LOGIN
                </Text>
                <Icon as={BsDot} />
                <Text
                    onClick={() =>
                        setAuthModalState(prevState => ({
                            ...prevState,
                            view: 'signUp',
                        }))
                    }
                >
                    SIGN UP
                </Text>
            </Flex>
        </Flex>
    )
}
export default ResetPassword
