import Head from 'next/head'

interface IProps {
    title: string
    description: string
    image: string
}

const SEO = ({ description, image, title }: IProps) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={image} />
    </Head>
)

export default SEO
