import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import SectionTitle from '../../components/section-title'
import Link from 'next/link'
import { getPost, getPostSlugs, getFooter } from '../../lib/strapi'
import FooterType from '../../interfaces/footer'
import Head from 'next/head'


type Props = {
  post: PostType
  preview?: boolean
  footer: FooterType
}

export default function Post({ post, preview, footer }: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>{post.title}｜最新消息｜法印佛堂</title>
      </Head>
      <Layout footer={footer}>
        <Container>
          <section>
            <SectionTitle>
              最新消息｜<br/>{post.title}
            </SectionTitle>

            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
            />

            <PostBody 
              content={post.content} 
            />

            <button className='mt-8 py-4 px-6 border border-[#433e48] text-lg leading-snug
                            hover:bg-[#433e48] hover:text-[#f5f1f2] duration-200 transition-colors'>
              <Link href='/posts'>
                <span>
                  點我查看更多消息 ＞
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
  const post = await getPost(params.slug)
  const content = await markdownToHtml(post.content || '')

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
      footer: footer
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS)
  }
}

export async function getStaticPaths() {
  const posts = await getPostSlugs()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: true,
  }
}
