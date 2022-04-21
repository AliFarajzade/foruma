import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'

const LogIn: React.FC = () => {
    const [formValues, setFormValues] = useState<{
        email: string
        password: string
    }>({
        email: '',
        password: '',
    })

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
            />

            <Input
                name="password"
                placeholder="Password"
                type="password"
                mb={2}
                onChange={handleChange}
            />
            <Button type="submit">Log In</Button>
        </>
    )
}

export default LogIn
