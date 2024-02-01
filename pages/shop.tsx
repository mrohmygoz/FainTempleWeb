import Layout from "../components/layout";
import FooterType from "../interfaces/footer";
import Container from "../components/container";
import markdownToHtml from "../lib/markdownToHtml";
import { getFooter, getProductsForPreview } from "../lib/strapi";
import ProductSection from "../components/product-section";
import ProductType from "../interfaces/product";
import SectionTitle from "../components/section-title";
import Head from "next/head";

type CategoryProducts = {
  category: string
  products: ProductType[]
}

type Props = {
  categoryProducts: CategoryProducts[]
  footer: FooterType;
};

export default function Shop({ categoryProducts, footer }: Props) {
  return (
    <>
      <Head>  
        <title>身心靈產品｜法印佛堂</title>
      </Head>
      <Layout footer={footer}>
        <Container>
          <section>
            <SectionTitle>
              身心靈產品
            </SectionTitle>
            {
              categoryProducts.map((categoryProduct) => (
                <ProductSection category={categoryProduct.category} products={categoryProduct.products} />
              ))
            }
          </section>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allProducts : ProductType[] = await getProductsForPreview();
  let categoryProducts : CategoryProducts[] = []
  let categorySet = new Set()
  allProducts.forEach(function (product) {
    if (categorySet.has(product.category)) {
      categoryProducts.forEach(function (categoryProduct) {
        if (categoryProduct.category === product.category) {
          categoryProduct.products = [...categoryProduct.products, product]
        }
      })
    } else {
      categoryProducts = [...categoryProducts, {
        category: product.category,
        products: [product]
      }]
      categorySet.add(product.category)
    }
  })

  const footer = await getFooter();
  footer.content = await markdownToHtml(footer.content || "");

  return {
    props: { categoryProducts, footer },
    revalidate: Number(process.env.REVALIDATE_SECONDS)
  };
};
