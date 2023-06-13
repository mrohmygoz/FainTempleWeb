import { useContext } from 'react'
import { CartContext } from '../context/shop-context';
import Link from 'next/link';

export default function ShoppingCartSummary({ cart }) {
  const { checkoutId, setCartOpen, clearCart } = useContext(CartContext)

  function getSubTotal() {
    let total = 0
    for (let i=0; i<cart.length; i++) {
      total += cart[i].product.price * cart[i].quantity
    }
    return total
  }

  return (
    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>總計</p>
        <p>${getSubTotal()}</p>
      </div>
      <div className="mt-6 flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black 
          border border-transparent rounded-md shadow-sm hover:bg-gray-800 cursor-pointer">
        <Link href={`/checkout/${checkoutId}`} onClick={() => setCartOpen(false)}>
          結帳
        </Link>
      </div>
      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
        <p>
          <button
            onClick={() => clearCart()}
            className="font-medium hover:text-gray-800"
          >
            清除購物車
          </button>
          {' '}或{' '}
          <button
            type="button"
            className="font-medium hover:text-gray-800"
            onClick={() => setCartOpen(false)}
          >
            繼續購物<span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  )
}