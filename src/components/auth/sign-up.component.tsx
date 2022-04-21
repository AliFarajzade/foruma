import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import authModalState from '../../recoil/atoms/auth-modal.atom'

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
    const setModalState = useSetRecoilState(authModalState)

    const handleChange = (eventParam: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = eventParam.target

        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <>
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
            <Button width="90%" my="5px" type="submit">
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
        </>
    )
}

export default SignUp
