import TeacherBlogPostType from "../interfaces/teacherBlogPost"
import TeacherBlogPostPreview from "./teacher-blog-post-preview"

type Props = {
  teacherBlogPosts: TeacherBlogPostType[]
}

const TeacherBlogGallery = ({ teacherBlogPosts }: Props) => {
  return (
    <div className="flex flex-col">
        {teacherBlogPosts.map((teacherBlogPost) => (
            <TeacherBlogPostPreview teacherBlogPost={teacherBlogPost} />
        ))}
    </div>
  )
}

export default TeacherBlogGallery
