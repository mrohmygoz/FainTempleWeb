import Footer from './footer2'
import Meta from './meta'
import Navbar from './navbar'
import FooterType from '../interfaces/footer'
import ShoppingCart from './shopping-cart'
import { useContext } from "react";
import { CartContext } from "../context/shop-context";

type Props = {
  preview?: boolean
  children: React.ReactNode
  footer: FooterType
}

const Layout = ({ preview, children, footer }: Props) => {
  const { cart } = useContext(CartContext)

  return (
    <>
      <Meta />
      <Navbar />
      <ShoppingCart cart={ cart } />
      <div className="lg:min-h-screen mb-10 lg:mb-20">
        <div className='h-20 lg:h-28'></div>
        <main>{children}</main>
      </div>
      <Footer footer={footer} />
    </>
  )
}

export default Layout
