import Link from "next/link";

export default function Page() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg px-8 py-6 rounded-2xl flex flex-col gap-6 w-full max-w-md">
                {/* LOGO */}
                <div className="flex justify-center">
                    <Link href={"/"}>
                        <h1 className="font-bold text-3xl text-indigo-600">LOGO</h1>
                    </Link>
                </div>

                {/* FORGOT PASSWORD FORM */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="new-password" className="font-medium text-sm text-gray-700">
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirm-password" className="font-medium text-sm text-gray-700">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            required
                        />
                    </div>

                    <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 font-semibold transition">
                        Reset Password
                    </button>
                </div>
            </div>
        </section>


    )
}