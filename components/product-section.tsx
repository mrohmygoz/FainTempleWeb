import type Product from '../interfaces/product'
import ProductPreview from './product-preview'

type Props = {
  category: string
  products: Product[]
}

const ProductSection = ({ category, products }: Props) => {
  return (
    <div>
      <h3 className='mb-12'>
        《　{category}　》
      </h3>

      {products.length > 0 && 
        <div className="mb-20 grid grid-cols-4 gap-6">
          {products.map((p) => (
              <ProductPreview product = {p} />
          ))}
        </div>
      }

      {products.length == 0 && 
        <div className='pb-10 text-2xl tracking-widest italic text-[#433e489f]'>
          目前尚無產品。
        </div>
      }
    </div>
  )
}

export default ProductSection
