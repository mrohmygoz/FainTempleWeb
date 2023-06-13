import Container from './container'
import FooterType from '../interfaces/footer'
import markdownStyles from './markdown-styles-footer.module.css'
import { BsFacebook } from 'react-icons/bs';


type Props = {
  footer: FooterType
}

const Footer = ({ footer } : Props) => {
  return (
    <footer>
      <Container>
        <div className="py-20 items-center grid grid-cols-1 md:grid-cols-7 gap-x-14 gap-y-4">
          <h3 className='col-span-2'>
            聯絡我們
          </h3>

          <div className='col-span-3'>
            <div
              className={markdownStyles['markdown']}
              dangerouslySetInnerHTML={{ __html: footer.content }}
            />
          </div>

          <div className='col-span-2'>
            <p className="text-lg leading-relaxed">
              電子郵件｜{footer.email}
            </p>

            <p className="text-lg leading-relaxed">
              電　　話｜{footer.phone}
            </p>

            <p className="text-lg leading-relaxed">
              海外撥打｜{footer.phone_abroad}
            </p>

            <button className='bg-black border-black text-white hover:bg-white hover:text-black border duration-200 transition-colors
                                font-bold py-2 px-12 mt-4'>
              <a href={footer.facebook_link}>
                <div className='flex items-center justify-center'>
                  <div className='flex items-center justify-center p-1'>
                    <BsFacebook />
                  </div>
                  {footer.facebook_link_text}
                </div>
              </a>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
