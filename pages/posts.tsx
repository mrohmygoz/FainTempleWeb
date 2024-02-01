import PostGallery from '../components/post-gallery'
import Layout from '../components/layout'
import Post from '../interfaces/post'
import Container from '../components/container'
import SectionTitle from '../components/section-title'
import Link from 'next/link'
import { getPosts, getFooter } from '../lib/strapi'
import FooterType from '../interfaces/footer'
import markdownToHtml from '../lib/markdownToHtml'
import Head from 'next/head'

type Props = {
  allPosts: Post[], 
  footer: FooterType
}

export default function Posts({ allPosts, footer }: Props) {
    return (
      <>
        <Head>
          <title>最新消息｜法印佛堂</title>
        </Head>
        <Layout footer={footer}>
          <Container>
            <section>
              <SectionTitle>
                最新消息
              </SectionTitle>

              {allPosts.length > 0 && 
                <PostGallery posts={allPosts} />
              }

              {allPosts.length == 0 && 
                <div className='pb-10 text-2xl tracking-widest italic text-[#433e489f]'>
                  目前尚無任何消息，敬請期待更多消息！
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
  const allPosts = await getPosts()
  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')
  
  return {
    props: { allPosts, footer },
    revalidate: Number(process.env.REVALIDATE_SECONDS)
  }
}