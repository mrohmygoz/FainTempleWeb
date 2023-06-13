import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout2'
import markdownToHtml from '../../lib/markdownToHtml'
import SectionTitle from '../../components/section-title'
import Link from 'next/link'
import { getFooter, getProductIds, getProduct } from '../../lib/strapi'
import FooterType from '../../interfaces/footer'
import ProductType from '../../interfaces/product'
import ProductDescription from '../../components/product-description'
import Image from 'next/image'
import { CartContext } from '../../context/shop-context'
import { useContext } from "react";

type Props = {
  product: ProductType
  footer: FooterType
}

export default function Product({ product, footer }: Props) {
  const { addToCart } = useContext(CartContext)

  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  if (!router.isFallback && !product?.pid) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout footer={footer}>
      <Container>
        <section className='mb-24'>
          <SectionTitle>
            身心靈產品
          </SectionTitle>

          <div className='flex space-x-8'>
            <div className='h-96 aspect-square relative flex justify-center overflow-hidden shadow-lg rounded-2xl'>
              <Image 
                alt={`Cover Image for product: ${product.name}`}
                src={product.coverImage}
                fill={true}
                style={{objectFit: 'contain'}}
              />
            </div>
            <div className='w-[32rem] p-6 flex flex-col justify-between shadow-lg rounded-2xl'>
              <div className='flex flex-col space-y-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex flex-col space-y-2'>
                    <span className='text-3xl font-extrabold'>{product.name}</span>
                    <span className='text-xl'>{product.category}</span>
                  </div>
                  <span className='text-xl font-bold'>$450</span>
                </div>
                <div>
                  {product.excerpt}
                </div>
              </div>
              <div>
                <button className='w-full p-2 rounded-lg text-[#f3e8eb] bg-black hover:bg-[#433e4836] hover:text-[#433e48]'
                  onClick={() => {addToCart(product)}}>
                  加入購物車
                </button>
              </div>
            </div>
          </div>

          <h3 className='mt-20 mb-12'>
            《　產品介紹　》
          </h3>
          <ProductDescription content={product.description} />

          <button className='mt-8 py-4 px-6 border border-[#433e48] text-lg leading-snug
                          hover:bg-[#433e48] hover:text-[#f5f1f2] duration-200 transition-colors'>
            <Link href='/shop'>
              <span>
                點我查看更多產品 ＞
              </span>
            </Link>
          </button>
        </section>
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    pid: string
  }
}

export async function getStaticProps({ params }: Params) {
  const product = await getProduct(params.pid)
  product.description = await markdownToHtml(product.description || '')

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')

  return {
    props: {
      product: product,
      footer: footer
    },
  }
}

export async function getStaticPaths() {
  const allProducts = await getProductIds()

  return {
    paths: allProducts.map((product) => {
      return {
        params: {
          pid: product.pid
        },
      }
    }),
    fallback: true,
  }
}
