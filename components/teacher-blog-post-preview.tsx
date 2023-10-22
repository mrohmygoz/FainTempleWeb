import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import TeacherBlogPostType from "../interfaces/teacherBlogPost"
import DateFormatter from './date-formatter'

type Props = {
  teacherBlogPost: TeacherBlogPostType
}

const TeacherBlogPostPreview = ({ teacherBlogPost }: Props) => {
  return (
    <div className='w-full flex flex-col border-b-[0.5px] border-[#433e482e] pb-8 mb-8 lg:pb-10 lg:mb-10'>
      <Link  
        as={`/teacher-blog-posts/${teacherBlogPost.slug}`}
        href="/teacher-blog-posts/[slug]"
      >
        <div className='text-xl py-1'>
          <DateFormatter dateString={teacherBlogPost.date} />
        </div>
        
        <div className='w-full flex lg:py-4 justify-center items-center'>
          <div className='flex-1 lg:h-52 flex-col overflow-hidden'>
            <div className='w-full text-xl lg:text-3xl font-bold leading-tight'>
              {teacherBlogPost.title}
            </div>
            <div className='hidden lg:flex py-4'>
              <p className='line-clamp-5'>
                {teacherBlogPost.content}
              </p>
            </div>
          </div>

          {teacherBlogPost.previewImage !== null ?
          (
            <div className=' w-20 h-20 lg:w-52 lg:h-52 relative ml-8'>
              <Image 
                src={teacherBlogPost.previewImage}
                alt={`Cover Image for product: ${teacherBlogPost.title}`}
                className={cn('shadow-sm w-full', {
                  'hover:shadow-lg transition-shadow duration-200': teacherBlogPost.slug,
                })}
                fill={true}
                style={{objectFit: 'cover'}}
              />
            </div>
          ) : (null)}
        </div>
      </Link>
    </div>
  )
}

export default TeacherBlogPostPreview
