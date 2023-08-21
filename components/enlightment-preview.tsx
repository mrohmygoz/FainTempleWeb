import DateFormatter from './date-formatter'
import { useRouter } from 'next/router'

type Props = {
  title: string
  date: string
  slug: string
  index: number
}

const EnlightmentPreview = ({
  title,
  date,
  slug,
  index
}: Props) => {

  const router = useRouter();
  
  return (
    <tr className={index % 2 == 0 
        ? 'bg-[#dbc1ad74] hover:bg-[#dbc1addf] hover:cursor-pointer group hover:font-extrabold hover:text-[#f5f1f2]' 
        : 'bg-[#dbc1ad58] hover:bg-[#dbc1addf] hover:cursor-pointer group hover:font-extrabold hover:text-[#f5f1f2]'}
        onClick={(row) => {
          router.push(`/enlightments/${slug}`);
        }}>

      <td>
        <DateFormatter dateString={date} />
      </td>

      <td>
        {title}
      </td>      

      <td className='text-base italic font-extralight tracking-widest text-transparent group-hover:text-[#f5f1f2]'>
        閱讀更多
      </td>
    </tr>
  )
}

export default EnlightmentPreview
