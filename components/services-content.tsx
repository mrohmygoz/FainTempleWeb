import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const ServicesContent = ({ content }: Props) => {
  return (
    <div className="mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default ServicesContent
