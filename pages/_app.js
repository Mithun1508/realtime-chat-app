import Head from "next/head";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{pageProps.title}</title>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <>
                <Component {...pageProps} />
            </>
        </>
    );
}

export default MyApp;
