import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../chakra/theme'
import Layout from '../components/layout/layout.component'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                    <Toaster />
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    )
}

export default MyApp
