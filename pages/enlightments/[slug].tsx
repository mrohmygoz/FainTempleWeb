import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout'
import markdownToHtml from '../../lib/markdownToHtml'
import SectionTitle from '../../components/section-title'
import Link from 'next/link'
import { getEnlightment, getEnlightmentSlugs, getFooter } from '../../lib/strapi'
import FooterType from '../../interfaces/footer'
import EnlightmentBody from '../../components/enlightment-body'
import EnlightmentType from '../../interfaces/enlightment'
import Head from 'next/head'

type Props = {
  enlightment: EnlightmentType
  preview?: boolean
  footer: FooterType
}

export default function Announcement({ enlightment, footer }: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  if (!router.isFallback && !enlightment?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{enlightment.title}｜佛菩薩開示法語｜法印佛堂</title>
      </Head>
      <Layout footer={footer}>
        <Container>
          <section>
            <SectionTitle>
              佛菩薩開示法語｜<br/>{enlightment.title}
            </SectionTitle>

            <EnlightmentBody
              content={enlightment.content}
            />

            <button className='mt-8 py-4 px-6 border border-[#433e48] text-lg leading-snug
                            hover:bg-[#433e48] hover:text-[#f5f1f2] duration-200 transition-colors'>
              <Link href='/enlightments'>
                <span>
                  點我查看更多佛菩薩開示法語 ＞
                </span>
              </Link>
            </button>
          </section>
        </Container>
      </Layout>
    </>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const enlightment = await getEnlightment(params.slug)
  const content = await markdownToHtml(enlightment.content || '')

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')

  return {
    props: {
      enlightment: {
        ...enlightment,
        content
      },
      footer
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS)
  }
}

export async function getStaticPaths() {
  const enlightments = await getEnlightmentSlugs()

  return {
    paths: enlightments.map((enlightment) => {
      return {
        params: {
          slug: enlightment.slug,
        },
      }
    }),
    fallback: true,
  }
}
