import Link from "next/link";

export default function Page() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg px-8 py-6 rounded-2xl flex flex-col gap-6 w-full max-w-md">
                {/* LOGO */}
                <div className="flex justify-center">
                    <Link href={"/"}>
                        <h1 className="font-bold text-3xl text-orange-600">LOGO</h1>
                    </Link>
                </div>

                {/* SIGNUP FORM */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-medium text-sm text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            required
                        />
                    </div>

                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 font-semibold transition">
                        Sign Up
                    </button>
                </div>

                {/* LINKS */}
                <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600 gap-2">
                    <Link href={"/login"} className="hover:text-orange-600">
                        Already user? <span className="font-medium">Login</span>
                    </Link>
                </div>
            </div>
        </section>

    )
}