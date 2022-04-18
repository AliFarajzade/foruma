import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/300.css'

const theme = extendTheme({
    colors: {
        brand: {
            primary: '#ffd300',
        },
    },
    fonts: {
        body: 'Open Sans, sans-serif',
    },

    styles: {
        global: () => ({
            body: {
                bg: 'gray.200',
            },
        }),
    },
})

export default theme
