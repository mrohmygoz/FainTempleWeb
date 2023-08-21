import EnlightmentType from '../interfaces/enlightment'
import Container from '../components/container'
import SectionTitle from '../components/section-title'
import markdownToHtml from '../lib/markdownToHtml'
import Link from 'next/link'
import { getEnlightments, getFooter } from '../lib/strapi'
import FooterType from '../interfaces/footer'
import Layout from '../components/layout'
import EnlightmentsGallery from '../components/enlightments-gallery'

type Props = {
    allEnlightments: EnlightmentType[],
    footer: FooterType
}

export default function Enlightments({ allEnlightments, footer }: Props) {
    return (
      <>
        <Layout footer={footer}>
          <Container>
            <section>
              <SectionTitle>
                佛菩薩開示法語
              </SectionTitle>

              {allEnlightments.length > 0 && 
                <EnlightmentsGallery enlightments={allEnlightments} />
              }

              {allEnlightments.length == 0 && 
                <div className='pb-10 text-2xl tracking-widest italic text-[#433e489f]'>
                  目前暫無佛菩薩開示法語
                </div>
              }
              
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
  const allEnlightments = await getEnlightments()

  for (let i=0; i<allEnlightments.length; i++) {
    allEnlightments[i].content = await markdownToHtml(allEnlightments[i].content || '')
  }

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')

  return {
    props: { allEnlightments, footer },
    revalidate: Number(process.env.REVALIDATE_SECONDS)
  }
}