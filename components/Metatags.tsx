import Head from "next/head";

export default function Metatags({ title, description=null, image=null }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@fireship_dev" />
            <meta name="twitter:title" content={title} />
            { description && <meta name="twitter:description" content={description} /> }
            { image && <meta name="twitter:image" content={image} /> }

            { title && <meta property="og:title" content={title} /> }
            { description && <meta property="og:description" content={description} /> }
            { image && <meta property="og:image" content={image} /> }
        </Head>
    )
}