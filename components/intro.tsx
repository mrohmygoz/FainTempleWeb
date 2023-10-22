import Image from 'next/image'
import ImgLink from "../public/cover2.png";
import markdownStyles from './markdown-styles.module.css'

type Props = {
  homeIntro: string
}

export default function Intro ({ homeIntro }: Props) {
  return (
    <section>
      <div className='relative w-full aspect-square lg:aspect-[25/9]'>
        <div className='absolute z-10 bg-[#f3e8eb09] w-full h-full' />
        <Image
          src={ImgLink}
          alt='cover image'
          fill
          style={{objectFit: 'cover'}}
        />
      </div>

      <div className="mx-auto text-center">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: homeIntro }}
        />
      </div>
    </section>
  )
}