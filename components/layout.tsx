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
      <div className="min-h-screen mb-20">
        <main>{children}</main>
      </div>
      <Footer footer={footer} />
    </>
  )
}

export default Layout
