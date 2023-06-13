import ProductCoverImage from './product-cover-image'
import Link from 'next/link'
import { CartContext } from '../context/shop-context'
import { useContext } from "react";
import ProductType from '../interfaces/product';

type Props = {
  product : ProductType
}

const ProductPreview = ({ product }: Props) => {

  const { addToCart } = useContext(CartContext)

  return (
    <div className='py-5 px-6 shadow-sm rounded-xl flex flex-col space-y-2'>
      <div className="">
        <ProductCoverImage product={product} />
      </div>
      <div className='text-2xl leading-snug'>
        <Link
          as={`/products/${product.pid}`}
          href="/products/[pid]"
          className="hover:underline"
        >
          {product.name}
        </Link>
      </div>
      <div className="text-xl flex justify-between items-center">
        <div>${product.price}</div>
        <button 
          onClick={() => {addToCart(product)}}
          className='py-2 px-4 text-[#f3e8eb] bg-black rounded-lg text-sm
                          hover:bg-[#433e4836] hover:text-[#433e48]'>
          加入購物車
        </button>
      </div>
    </div>
  )
}

export default ProductPreview
