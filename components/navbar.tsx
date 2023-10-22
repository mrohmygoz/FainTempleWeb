import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import Container from "./container";
import Image from "next/image";
import LogoImg from "../public/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import NavbarItem from "./navbar-item";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/shop-context";

export default function Navbar() {
  const { cart, setCartOpen } = useContext(CartContext);
  const [nav, setNav] = useState(false);
  const [bg, setBg] = useState(false);

  const openNav = function () {
    setNav(true);
  };
  const closeNav = function () {
    setNav(false);
  };

  useEffect(() => {
    const handleBg = function () {
      if (window.scrollY >= 90) {
        setBg(true);
      } else {
        setBg(false);
      }
    };
    window.addEventListener('scroll', handleBg);
});

  return (
    <div className="z-50 w-full fixed">
      {/* MOBILE MENU */}
      <div className={nav ?
                      'z-40 fixed w-full h-screen bg-[#dad1d3]' :
                      'hidden ease-in-out duration-300'}>
        <Container>
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <ul>
              <NavbarItem title="佛菩薩開示法語" link="/enlightments" />
              <NavbarItem title="蔡君如老師" link="/teacher" />
              <NavbarItem title="蔡老師之輕聲細語" link="/teacher-blog" />
              <NavbarItem title="服務項目" link="/services" />
              <NavbarItem title="最新消息" link="/posts" />
              <a href="https://academy.fain.tw" target="_blank" onClick={() => closeNav()}>
                <li className="nav-item">法印光能學會</li>
              </a>
              <NavbarItem title="身心靈產品" link="/shop" />
              <li className="nav-item flex justify-center items-center">
                <div onClick={() => setCartOpen(true)}
                    className="flex justify-normal items-center">
                  <AiOutlineShoppingCart />
                  <button>
                    購物車{cart.length > 0 ? <>({cart.length})</> : null}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      {/* MOBILE TOP BAR */}
      <div className={bg ? "z-50 bg-[#dad1d3] lg:hidden" : "lg:hidden"}>
        <Container>
          <div className={bg ?
              "py-2 flex items-center justify-between ease-in-out duration-300" :
              "py-4 flex items-center justify-between"}>
            <Link href="/" className="z-50">
              <Image src={LogoImg} alt="logo" width={180} />
            </Link>
            <div className="z-50 flex justify-center items-center gap-2">
              <div className="flex gap-1 justify-center items-center">
                <AiOutlineShoppingCart 
                  onClick={() => setCartOpen(true)}
                  size={25} 
                />
                <div className="text-lg flex justify-center items-center">
                  {cart.length > 0 ? <>({cart.length})</> : null}
                </div>
              </div>
              <IoMenuOutline 
                className={nav ? 
                  'hidden ease-in-out duration-300' : 
                  'z-50 hover:cursor-pointer hover:text-[#5c5c5c86]'} 
                onClick={openNav} 
                size={30} 
              />
              <IoCloseOutline 
                className={!nav ? 
                  'hidden ease-in-out duration-300' : 
                  'z-50 hover:cursor-pointer hover:text-[#5c5c5c86]'} 
                onClick={closeNav} 
                size={30} 
              />
            </div>
          </div>
        </Container>
      </div>

      {/* DESKTOP */}
      <div className={bg ? 
          "hidden lg:flex bg-[#dad1d3] ease-in-out duration-300 " : 
          "hidden lg:flex"}>
        <Container>
          <div className={bg ? 
              "py-1 flex items-center justify-between ease-in-out duration-300" : 
              "py-8 flex items-center justify-between"}>
            <Link href="/">
              <Image src={LogoImg} alt="logo" width={bg ? 180 : 250} />
            </Link>

            <ul className={bg ?
                  "hidden lg:navbar lg:flex" :
                  "hidden lg:navbar lg:flex border-y-black border-y-[1px] py-1"}>
              <NavbarItem title="佛菩薩開示法語" link="/enlightments" />
              <li className="nav-group-parent relative group">
                <Link className="hover:text-[#433e4836]" href="/teacher">
                  蔡君如老師
                </Link>
                <ul className="absolute pt-4 hidden group-hover:block truncate">
                  <Link href="/teacher-blog">
                    <li className={bg ? "nav-group-item-bg" : "nav-group-item"}>蔡老師之輕聲細語</li>
                  </Link>
                  <Link href="/services">
                    <li className={bg ? "nav-group-item-bg" : "nav-group-item"}>服務項目</li>
                  </Link>
                </ul>
              </li>
              <NavbarItem title="最新消息" link="/posts" />
              <a href="https://academy.fain.tw" target="_blank">
                <li className="nav-item">法印光能學會</li>
              </a>
              <NavbarItem title="身心靈產品" link="/shop" />
              <li className="nav-item">
                <div onClick={() => setCartOpen(true)}
                    className="flex justify-normal items-center">
                  <AiOutlineShoppingCart />
                  <button>
                    購物車{cart.length > 0 ? <>({cart.length})</> : null}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
