import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
    return (
        <Html>
            <Head />
            <link
                rel="icon"
                type="image/x-icon"
                href="/images/foruma-f.png"
            ></link>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
