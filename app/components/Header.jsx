"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Get user from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('company');
        setUser(null);
        router.push('/login');
    };

    const getMenuItems = (userRole) => {
        const baseMenu = [
            // {
            //     name: "Home",
            //     link: "/"
            // },
            {
                name: "Dashboard",
                link: "/dashboard"
            },
            {
                name: "Expenses",
                link: "/expense"
            },
            {
                name: "History",
                link: "/history"
            }
        ];

        if (userRole === 'Manager' || userRole === 'Admin') {
            baseMenu.push({
                name: "Approvals",
                link: "/approval"
            });
        }

        if (userRole === 'Admin') {
            baseMenu.push(
                {
                    name: "Users",
                    link: "/users"
                },
                {
                    name: "Rules",
                    link: "/rules"
                }
            );
        }

        return baseMenu;
    };

    const menu = getMenuItems(user?.role);

    return (
        // <section className="flex items-center justify-between p-5 bg-blue-600 text-white shadow-lg">
        //     {/* Logo */}
        //     <div className="font-bold text-2xl">
        //         <Link href={"/"}>
        //             <h1>ExpenseManager</h1>
        //         </Link>
        //     </div>

        //     {/* Navigation Menu */}
        //     {user && (
        //         <div className="flex items-center gap-5">
        //             {menu.map((item) => (
        //                 <Link href={item?.link} key={item?.name}>
        //                     <h1 className="font-semibold hover:underline transition-colors">
        //                         {item?.name}
        //                     </h1>
        //                 </Link>
        //             ))}
        //         </div>
        //     )}

        //     {/* User Info & Actions */}
        //     <div className="flex items-center gap-4">
        //         {user ? (
        //             <>
        //                 <div className="text-right">
        //                     <p className="text-sm font-medium">{user.name}</p>
        //                     <p className="text-xs opacity-80">{user.role}</p>
        //                 </div>
        //                 <button
        //                     onClick={handleLogout}
        //                     className="bg-blue-800 hover:bg-blue-900 rounded-lg px-4 py-2 transition-colors"
        //                 >
        //                     Logout
        //                 </button>
        //             </>
        //         ) : (
        //             <Link href={"/login"}>
        //                 <h1 className="bg-blue-800 hover:bg-blue-900 rounded-lg px-4 py-2 transition-colors">
        //                     Login
        //                 </h1>
        //             </Link>
        //         )}
        //     </div>
        // </section>




        <section className="fixed w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            {/* Logo */}
            <div className="font-extrabold text-3xl tracking-wide text-white hover:text-yellow-300 transition-colors">
                <Link href={"/"}>
                    <h1>ExpenseManager</h1>
                </Link>
            </div>

            {/* Navigation Menu */}
            {user && (
                <div className="flex items-center gap-8">
                    {menu.map((item) => (
                        <Link href={item?.link} key={item?.name}>
                            <h1 className="font-semibold hover:text-yellow-300 hover:scale-105 transition-all duration-300 cursor-pointer">
                                {item?.name}
                            </h1>
                        </Link>
                    ))}
                </div>
            )}

            {/* User Info & Actions */}
            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <div className="text-right mr-2">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs opacity-80">{user.role}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-xl shadow-lg hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href={"/login"}>
                        <h1 className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-xl shadow-lg hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                            Login
                        </h1>
                    </Link>
                )}
            </div>
        </section>
    )
}