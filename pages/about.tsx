import AboutContent from '../components/about-content'
import Container from '../components/container'
import Layout from '../components/layout2'
import markdownToHtml from '../lib/markdownToHtml'
import SectionTitle from '../components/section-title'
import Link from 'next/link'
import { getAboutContent, getFooter } from '../lib/strapi'
import FooterType from '../interfaces/footer'

type Props = {
  content: string,  
  footer: FooterType
}

export default function About({ content, footer }: Props) {
  return (
    <>
      <Layout footer={footer}>
        <Container>
          <section>
            <SectionTitle>
              關於法印
            </SectionTitle>
            <AboutContent content={content} />
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
  const response = await getAboutContent()
  const content = await markdownToHtml(response || '')
  
  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')

  return {
    props: { content, footer },
  }
}