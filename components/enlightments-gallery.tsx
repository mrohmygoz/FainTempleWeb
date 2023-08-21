import EnlightmentType from "../interfaces/enlightment"
import EnlightmentPreview from "./enlightment-preview"

type Props = {
  enlightments: EnlightmentType[]
}

const EnlightmentsGallery = ({ enlightments }: Props) => {
  return (
    <div>
      <span className='text-lg  font-extralight tracking-widest'>
        點選以閱讀佛菩薩開示法語
      </span>
      <table className='mt-4'>
        <thead>
          <tr>
            <th className='w-[10%]'>發佈日期</th>
            <th className=''>標 題</th>
            <th className='w-[10%]'></th>
          </tr>
        </thead>
        <tbody>
          {enlightments.map((announcement, index) => (
              <EnlightmentPreview
                  key={announcement.slug}
                  title={announcement.title}
                  date={announcement.date}
                  slug={announcement.slug}
                  index={index}
              />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EnlightmentsGallery
