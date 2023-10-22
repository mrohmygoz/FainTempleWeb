import PostCoverImage from './post-cover-image'

type Props = {
  title: string
  coverImage: string
  date: string
}

const EventHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <div className="mb-6 lg:mb-10 text-3xl lg:text-4xl font-bold leading-tight">
          {title}
      </div>
      <div className="w-full lg:w-[60%] mb-6 lg:mb-10 sm:mx-0">
        <PostCoverImage title={title} src={coverImage} />
      </div>
    </>
  )
}

export default EventHeader
