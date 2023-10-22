import PostPreview from './post-preview'
import type Post from '../interfaces/post'

type Props = {
  posts: Post[]
}

const PostGallery = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16 gap-10">
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
