import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: '60px',
        fontSize: '10pt',
        fontWeight: 700,
        _focus: {
            boxShadow: 'none',
        },
    },
    sizes: {
        sm: {
            fontSize: '8pt',
        },
        md: {
            fontSize: '10pt',
            // height: "28px",
        },
    },
    variants: {
        solid: {
            color: 'white',
            bg: 'blue.500',
            _hover: {
                bg: 'blue.400',
            },
        },
        outline: {
            color: 'blue.500',
            border: '1px solid',
            borderColor: 'blue.500',
        },
        oauth: {
            py: '5',
            height: '34px',
            border: '1px solid',
            borderColor: 'gray.400',
            _hover: {
                bg: 'gray.50',
                borderColor: 'gray.300',
            },
        },
    },
}

export default Button
