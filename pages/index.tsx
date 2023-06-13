import Layout from '../components/layout2'
import Post from '../interfaces/post'
import Intro from '../components/intro'
import markdownToHtml from '../lib/markdownToHtml'
import EventSection from '../components/post-section'
import Container from '../components/container'
import { getPosts, getHomeIntroContent, getFooter } from '../lib/strapi'
import FooterType from '../interfaces/footer'

type Props = {
  homeIntro: string,
  allPosts: Post[],
  footer: FooterType
}

export default function Index({ homeIntro, allPosts, footer }: Props) {
  return (
    <>
      <Layout footer={footer}>
        <Container>
          <Intro homeIntro={homeIntro} />
          <EventSection posts={allPosts} />
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const homeIntroRaw = await getHomeIntroContent()
  const homeIntro = await markdownToHtml(homeIntroRaw || '')

  const allPosts = await getPosts()

  const footer = await getFooter()
  footer.content = await markdownToHtml(footer.content || '')

  return {
    props: { homeIntro, allPosts, footer }
  }
}
