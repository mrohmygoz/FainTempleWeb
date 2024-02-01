import Layout from '../components/layout'
import Container from '../components/container'
import SectionTitle from '../components/section-title'
import Link from 'next/link'
import { getFooter, getTeacherBlogPosts } from '../lib/strapi'
import FooterType from '../interfaces/footer'
import markdownToHtml from '../lib/markdownToHtml'
import markdownToPlain from '../lib/markdownToPlain'
import TeacherBlogPostType from '../interfaces/teacherBlogPost'
import TeacherBlogGallery from '../components/teacher-blog-gallery'
import Head from 'next/head'

type Props = {
  allPosts: TeacherBlogPostType[], 
  footer: FooterType
}

export default function TeacherBlog({ allPosts, footer }: Props) {
    return (
      <>
        <Head>
          <title>蔡老師之輕聲細語｜法印佛堂</title>
        </Head>
        <Layout footer={footer}>
          <Container>
            <section>
              <SectionTitle>
                蔡老師之輕聲細語
              </SectionTitle>

              {allPosts.length > 0 && 
                <TeacherBlogGallery teacherBlogPosts={allPosts} />
              }

              {allPosts.length == 0 && 
                <div className='pb-10 text-2xl tracking-widest italic text-[#433e489f]'>
                  目前尚無任何內容。
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
  const allPosts = await getTeacherBlogPosts()
  allPosts.forEach(async function (post) {
    post.content = await markdownToPlain(post.content || '')
  })

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')
  
  return {
    props: { allPosts, footer },
    revalidate: Number(process.env.REVALIDATE_SECONDS)
  }
}