import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from '../context/shop-context';
import { useContext } from 'react'

export default function CheckoutItem({ cartProduct }) {
  const { setCartOpen, removeCartItem, incrementCartItem, decrementCartItem } = useContext(CartContext)

  return(
    <li key={cartProduct.product.pid + Math.random()} className="relative flex py-4 items-center">
      <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden border border-gray-200 rounded-md">
        <Image
          src={cartProduct.product.coverImage}
          alt={cartProduct.product.name}
          fill={true}
          style={{objectFit: 'cover'}}
        />
      </div>

      <div className="flex flex-col justify-center flex-1 ml-4">
        <div className="flex justify-between font-medium">
          <div className='flex flex-col justify-center space-y-[0.1rem]'>
            <span className='hover:underline text-lg font-extrabold'>
              {cartProduct.product.name}
            </span>
            <div className='text-sm'>
              {cartProduct.product.category}
            </div>
          </div>
          
          <div className="flex justify-end items-center ml-4">
            <div>
              ${ cartProduct.product.price }
            </div>
            <div className='ml-1'>
              x
            </div>
            <div className='ml-1'>
              { cartProduct.quantity }
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}