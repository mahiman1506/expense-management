import Link from "next/link";

export default function Page() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg px-8 py-6 rounded-2xl flex flex-col gap-6 w-full max-w-md">
                {/* LOGO */}
                <div className="flex justify-center">
                    <Link href={"/"}>
                        <h1 className="font-bold text-3xl text-blue-600">LOGO</h1>
                    </Link>
                </div>

                {/* LOGIN FORM */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-medium text-sm text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-medium text-sm text-gray-700">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold transition">
                        Login
                    </button>
                </div>

                {/* LINKS */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 gap-2">
                    <Link href={"/signup"} className="hover:text-blue-600">
                        New user? <span className="font-medium">Sign up</span>
                    </Link>
                    <Link href={"/forgot-password"} className="hover:text-blue-600">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </section>

    )
}