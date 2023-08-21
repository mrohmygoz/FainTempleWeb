import Link from "next/link";
import Container from "./container";
import Image from "next/image";
import LogoImg from "../public/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai"
import NavbarItem from "./navbar-item";
import { useContext } from "react";
import { CartContext } from "../context/shop-context";

export default function Navbar() {
    const { cart, setCartOpen } = useContext(CartContext)

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex items-center justify-between'>
                    <Link href='/'>
                        <Image
                            src={LogoImg}
                            alt='logo'
                            width={380}
                        />
                    </Link>

                    <ul className="navbar flex">
                        <NavbarItem title='佛菩薩開示法語' link='/enlightments' />
                        <li className="nav-group-parent relative group">
                            <Link className="hover:text-[#433e4836]" href="/teacher">蔡君如老師</Link>
                            <ul className="absolute pt-4 hidden group-hover:block truncate">
                                <Link href='/teacher-blog'><li className="nav-group-item">蔡老師之輕聲細語</li></Link>
                                <Link href='/services'><li className="nav-group-item">服務項目</li></Link>
                            </ul>
                        </li>
                        <NavbarItem title='最新消息' link='/posts' />
                        <a href='https://academy.fain.tw'>
                            <li className="nav-item">法印光能學會</li>
                        </a>
                        <NavbarItem title='身心靈產品' link='/shop' />
                        <li className="nav-item">
                            <div className="flex justify-normal items-center">
                                <AiOutlineShoppingCart />
                                <button onClick={() => setCartOpen(true)}>
                                    購物車{cart.length > 0 ? <>({cart.length})</> : null}
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}