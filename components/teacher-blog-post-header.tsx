import Image from 'next/image'

const TeacherBlogPostHeader = ({ teacherBlogPost }) => {
    return (
        <>
            <h2>
                蔡老師之輕聲細語
            </h2>

            <div className='mb-10 lg:mb-16 w-24 h-2 bg-[#dbc1ad]' />

            <div className="mb-6 lg:mb-10 text-3xl lg:text-4xl font-bold leading-tight">
                {teacherBlogPost.title}
            </div>

            {
                teacherBlogPost.previewImage !== null ? (
                    <div className='w-full lg:w-[50%] mb-6 lg:mb-10'>
                        <Image 
                            src={teacherBlogPost.previewImage}
                            alt={`Cover Image for ${teacherBlogPost.title}`}
                            width={1300}
                            height={630}
                        />
                    </div>
                ) : (null)
            }
            
        </>
    )
}

export default TeacherBlogPostHeader
  