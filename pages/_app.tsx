import 'styles/globals.css'
// import "flowbite"
import 'styles/walletAdapter.css'
import type { AppProps } from 'next/app'

import { Flowbite } from "flowbite-react";
import Layout from 'layouts/base';




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Flowbite>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Flowbite>
  )
}

export default MyApp
