import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import ProductType from '../interfaces/product'

type Props = {
  product: ProductType
}

const ProductCoverImage = ({ product }: Props) => {
  const image = (
    <Image
      src={product.coverImage}
      alt={`Cover Image for product: ${product.name}`}
      className={cn('shadow-sm w-full', {
        'hover:shadow-lg transition-shadow duration-200': product.pid,
      })}
      fill={true}
      style={{objectFit: 'contain'}}
    />
  )

  return (
    <div className="relative overflow-clip aspect-square flex justify-center items-center">
      <Link as={`/products/${product.pid}`} href="/products/[pid]" aria-label={product.name}>
        {image}
      </Link>
    </div>
  )
}

export default ProductCoverImage
