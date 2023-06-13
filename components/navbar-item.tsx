import Link from 'next/link'

export default function NavbarItem({ title, link }) {
  return (
    <li className="navbar">
      <Link href={link}>
        {title}
      </Link>
    </li>
    
  )
}