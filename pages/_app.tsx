import { AppProps } from 'next/app'
import '../styles/index.css'
import Head from 'next/head'
import CartProvider from '../context/shop-context'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>法印佛堂</title>
    </Head>
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  </>
}
