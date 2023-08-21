import ServicesContent from '../components/services-content'
import Container from '../components/container'
import Layout from '../components/layout'
import markdownToHtml from '../lib/markdownToHtml'
import SectionTitle from '../components/section-title'
import Link from 'next/link'
import { getServicesContent, getFooter } from '../lib/strapi'
import FooterType from '../interfaces/footer'

type Props = {
    content: string,
    footer: FooterType
}

export default function Services({ content, footer }: Props) {
    return (
      <>
        <Layout footer={footer}>
          <Container>
            <section>
              <SectionTitle>
                服務項目
              </SectionTitle>
              <ServicesContent content={content} />
              <button className='mt-8 py-4 px-6 border border-[#433e48] text-lg leading-snug
                          hover:bg-[#433e48] hover:text-[#f5f1f2] duration-200 transition-colors'>
                <Link href='/'>
                  <span>
                    回首頁 ＞
                  </span>
                </Link>
              </button>
            </section>
          </Container>
        </Layout>
      </>
    )
}

export const getStaticProps = async () => {
  const response = await getServicesContent()
  const content = await markdownToHtml(response || '')

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')
  
  return {
    props: { content, footer },
  }
}