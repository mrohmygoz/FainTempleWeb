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
                        <NavbarItem title='關於法印' link='/about' />
                        <NavbarItem title='最新消息' link='/posts' />
                        <NavbarItem title='服務項目' link='/services' />
                        <NavbarItem title='蔡君如老師' link='/teacher' />
                        <a href='https://academy.fain.tw'>
                            <li className="navbar">法印光能學會</li>
                        </a>
                        <NavbarItem title='身心靈產品' link='/shop' />
                        <li className="navbar">
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