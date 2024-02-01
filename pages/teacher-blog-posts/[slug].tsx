import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Layout from '../../components/layout'
import markdownToHtml from '../../lib/markdownToHtml'
import Link from 'next/link'
import { getFooter, getTeacherBlogPost, getTeacherBlogPostSlugs } from '../../lib/strapi'
import FooterType from '../../interfaces/footer'
import TeacherBlogPostType from '../../interfaces/teacherBlogPost'
import TeacherBlogPostBody from '../../components/teacher-blog-post-body'
import TeacherBlogPostHeader from '../../components/teacher-blog-post-header'
import Head from 'next/head'


type Props = {
  teacherBlogPost: TeacherBlogPostType
  footer: FooterType
}

export default function Post({ teacherBlogPost, footer }: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  if (!router.isFallback && !teacherBlogPost?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Head>
        <title>{teacherBlogPost.title}｜蔡老師之輕聲細語｜法印佛堂</title>
      </Head>
      <Layout footer={footer}>
        <Container>
          <section>
            <TeacherBlogPostHeader teacherBlogPost={teacherBlogPost} />

            <TeacherBlogPostBody 
              content={teacherBlogPost.content} 
            />

            <button className='mt-8 py-4 px-6 border border-[#433e48] text-lg leading-snug
                            hover:bg-[#433e48] hover:text-[#f5f1f2] duration-200 transition-colors'>
              <Link href='/teacher-blog-posts'>
                <span>
                  點我查看更多輕聲細語 ＞
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
  const teacherBlogPost = await getTeacherBlogPost(params.slug)
  const content = await markdownToHtml(teacherBlogPost.content || '')

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')

  return {
    props: {
      teacherBlogPost: {
        ...teacherBlogPost,
        content,
      },
      footer: footer
    },
    revalidate: Number(process.env.REVALIDATE_SECONDS)
  }
}

export async function getStaticPaths() {
  const posts = await getTeacherBlogPostSlugs()

  return {
    paths: posts.map((teacherBlogPost) => {
      return {
        params: {
          slug: teacherBlogPost.slug,
        },
      }
    }),
    fallback: true,
  }
}
