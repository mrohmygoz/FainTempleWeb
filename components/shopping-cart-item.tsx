import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from '../context/shop-context';
import { useContext } from 'react'

export default function ShoppingCartItem({ cartProduct }) {
  const { setCartOpen, removeCartItem, incrementCartItem, decrementCartItem } = useContext(CartContext)

  return(
    <li key={cartProduct.product.pid + Math.random()} className="relative flex py-6">
      <div className="relative flex-shrink-0 w-28 h-28 overflow-hidden border border-gray-200 rounded-md">
        <Image
          src={cartProduct.product.coverImage}
          alt={cartProduct.product.name}
          fill={true}
          style={{objectFit: 'cover'}}
        />
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <div className="flex justify-between font-medium">
          <div className='flex flex-col space-y-[0.1rem]'>
            <Link href={`/products/${cartProduct.product.pid}`} passHref>
              <span 
                onClick={() => setCartOpen(false)}
                className='hover:underline text-lg font-extrabold'
              >
                {cartProduct.product.name}
              </span>
            </Link>
            <div className='text-sm'>
              {cartProduct.product.category}
            </div>
          </div>
          <div className="ml-4">
            ${ cartProduct.product.price }
          </div>
        </div>

        <div className="flex items-end justify-between flex-1 text-base">
          <div className={`border`}>
            <button 
              className="px-2" 
              onClick={() => decrementCartItem(cartProduct)}
            >
              -
            </button>
            <span className="px-2 border-l border-r">{cartProduct.quantity}</span>
            <button 
              className="px-2" 
              onClick={() => incrementCartItem(cartProduct)}
            >
              +
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => removeCartItem(cartProduct)}
              type="button"
              className="font-medium hover:text-[#433e4854]"
            >
              移除
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}