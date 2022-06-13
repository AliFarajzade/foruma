import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import theme from '../chakra/theme'
import Layout from '../components/layout/layout.component'
import { printASCII } from '../helpers/asci.helper'
import '../style.css'

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const handleRouteStart = () => NProgress.start()
        const handleRouteDone = () => NProgress.done()

        Router.events.on('routeChangeStart', handleRouteStart)
        Router.events.on('routeChangeComplete', handleRouteDone)
        Router.events.on('routeChangeError', handleRouteDone)

        return () => {
            Router.events.off('routeChangeStart', handleRouteStart)
            Router.events.off('routeChangeComplete', handleRouteDone)
            Router.events.off('routeChangeError', handleRouteDone)
        }
    }, [])

    printASCII()
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
