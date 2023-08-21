import { createContext, useState, useEffect } from 'react'
import ProductType from '../interfaces/product'
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_ID_FAIN_CHECKOUT = 'fain_checkout'

const CartContext = createContext(undefined)

type CartProductType = {
  quantity: number,
  product: ProductType
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')

  async function addToCart(product : ProductType) {
    setCartOpen(true)

    const newCartProduct = {
      quantity: 1,
      product: product
    }

    if (cart.length === 0) {
      setCart([newCartProduct])
      const checkoutId = uuidv4().substring(0, 8).toUpperCase()
      setCheckoutId(checkoutId)
      localStorage.setItem(LOCAL_STORAGE_ID_FAIN_CHECKOUT, 
        JSON.stringify({
          checkoutId: checkoutId,
          cart: [newCartProduct]
        }))
    } else {
      let newCart = []
      let added = false

      cart.map(cartProduct => {
        if (cartProduct.product.pid === newCartProduct.product.pid) {
          cartProduct.quantity++
          newCart = [...cart]
          added = true
        }
      })

      if (!added) {
        newCart = [...cart, newCartProduct]
      }

      setCart(newCart)
      localStorage.setItem(LOCAL_STORAGE_ID_FAIN_CHECKOUT, JSON.stringify({
        checkoutId: checkoutId,
        cart: newCart
      }))
    }
  }

  async function clearCart() {
    setCart([])
    setCheckoutId('')
    localStorage.setItem(LOCAL_STORAGE_ID_FAIN_CHECKOUT, null)
  }

  async function removeCartItem(targetCartProduct : CartProductType) {
    const newCart = cart.filter(cartProduct => 
      cartProduct.product.pid !== targetCartProduct.product.pid)
    setCart(newCart)

    localStorage.setItem(LOCAL_STORAGE_ID_FAIN_CHECKOUT, JSON.stringify({
      checkoutId: checkoutId,
      cart: newCart
    }))
  }

  async function incrementCartItem(targetCartProduct : CartProductType) {
    let newCart = []
    cart.map(cartProduct => {
      if (cartProduct.product.pid === targetCartProduct.product.pid) {
        cartProduct.quantity++
        newCart = [...cart]
      }
    })

    setCart(newCart)

    localStorage.setItem(LOCAL_STORAGE_ID_FAIN_CHECKOUT, JSON.stringify({
      checkoutId: checkoutId,
      cart: newCart
    }))
  }

  async function decrementCartItem(targetCartProduct : CartProductType) {
    let newCart = []
    if (targetCartProduct.quantity === 1) {
      removeCartItem(targetCartProduct)
    } else {
      cart.map(cartProduct => {
        if (cartProduct.product.pid === targetCartProduct.product.pid) {
          cartProduct.quantity--
          newCart = [...cart]
        }
      })

      setCart(newCart)

      localStorage.setItem(LOCAL_STORAGE_ID_FAIN_CHECKOUT, JSON.stringify({
        checkoutId: checkoutId,
        cart: newCart
      }))
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      checkoutId,
      setCartOpen,
      addToCart,
      clearCart,
      removeCartItem,
      incrementCartItem,
      decrementCartItem
    }}>
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }