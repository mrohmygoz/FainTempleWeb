import PostCoverImage from './post-cover-image'

type Props = {
  title: string
  coverImage: string
  date: string
}

const EventHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <div className="w-full lg:w-[60%] mb-8 md:mb-16 sm:mx-0">
        <PostCoverImage title={title} src={coverImage} />
      </div>
    </>
  )
}

export default EventHeader
