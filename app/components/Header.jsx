"use client"

import Link from "next/link"

export default function Header() {
    const menu = [
        {

            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Contact",
            link: "/contact"
        }
    ]
    return (
        <section className="flex items-center justify-between p-5 bg-blue-400 text-white">
            {/* logo  */}
            <div className="font-bold text-2xl">
                <Link href={"/"}>
                    <h1>LOGO</h1>
                </Link>
            </div>
            {/* menu  */}
            <div className="flex items-center gap-5 ">
                {menu.map((item) => (
                    <Link href={item?.link} key={item?.name}>
                        <h1 className="font-semibold hover:underline">
                            {item?.name}
                        </h1>
                    </Link>
                ))}
            </div>
            <Link href={"/login"}>
                <h1 className="bg-blue-800 rounded-lg px-4 py-2">Login</h1>
            </Link>
        </section>
    )
}