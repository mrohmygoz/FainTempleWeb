import Image from 'next/image'

const TeacherBlogPostHeader = ({ teacherBlogPost }) => {
    return (
        <>
            <h2>
                蔡老師之輕聲細語
            </h2>

            <div className='mb-[4.5rem] w-24 h-2 bg-[#dbc1ad]' />

            <div className="mb-[4.5rem] text-4xl md:text-6xl font-bold leading-tight">
                {teacherBlogPost.title}
            </div>

            {
                teacherBlogPost.previewImage !== null ? (
                    <div className='w-full lg:w-[50%] aspect-square'>
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
  