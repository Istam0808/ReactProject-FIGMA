import Link from "next/link";
import "./style.scss";
import Image from "next/image";
import Logo from "../../../assets/icons/logo.png"

function Nav() {
    return (
        <nav>
            <div className="left">
                <Link href="/" />
                <Image src={Logo} width={100} height={100} alt="logo" />
            </div>
            <div className="right">
                <div className="right-left">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/blog">Blog</Link>
                </div>
                <div className="right-right">
                    <button>ВОЙТИ</button>
                    <p>РУС</p>
                </div>
            </div>
        </nav>
    );
}

export default Nav;