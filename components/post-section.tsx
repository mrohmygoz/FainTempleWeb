import type Post from '../interfaces/post'
import SectionTitle from './section-title'
import PostGallery from './post-gallery'
import Link from 'next/link'

type Props = {
  posts: Post[]
}

const PostSection = ({ posts }: Props) => {
  return (
    <section>
      <SectionTitle>
        最新消息
      </SectionTitle>

      {posts.length > 0 && posts.length <= 3 && 
        <PostGallery posts={posts} />
      }
      
      {posts.length > 3 && 
        <>
          <PostGallery posts={posts.slice(0, 3)} />
          <button className='mt-8 py-4 px-6 border border-[#433e48] text-lg leading-snug
                          hover:bg-[#433e48] hover:text-[#f5f1f2] duration-200 transition-colors'>
            <Link href='/posts'>
              <span>
                點我查看更多最新消息 ＞
              </span>
            </Link>
          </button>
        </>
      }

      {posts.length == 0 && 
        <div className='pb-10 text-2xl tracking-widest italic text-[#433e489f]'>
          目前尚無消息，敬請期待更多消息！
        </div>
      }
    </section>
  )
}

export default PostSection
