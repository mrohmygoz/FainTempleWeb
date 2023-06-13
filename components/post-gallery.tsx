import PostPreview from './post-preview'
import type Post from '../interfaces/post'

type Props = {
  posts: Post[]
}

const PostGallery = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-16 gap-20">
        {posts.map((post) => (
            <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                slug={post.slug}
                excerpt={post.excerpt}
            />
        ))}
    </div>
  )
}

export default PostGallery
