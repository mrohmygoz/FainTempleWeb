import Image from 'next/image'
import ImgLink from "../public/cover2.png";
import markdownStyles from './markdown-styles.module.css'

type Props = {
  homeIntro: string
}

export default function Intro ({ homeIntro }: Props) {
  return (
    <section>
      <Image
        src={ImgLink}
        className='w-full'
        alt=''
      />

      <div className="mx-auto mt-10 text-center">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: homeIntro }}
        />
      </div>
    </section>
  )
}