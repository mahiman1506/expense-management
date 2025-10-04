import Link from "next/link";

export default function Page() {
    return (
        <section className="flex items-center justify-center p-24 min-h-screen w-full">
            <div className="bg-amber-300 p-10 rounded-lg flex flex-col gap-5">
                <div>
                    <Link href={"/"}>
                        <h1 className="font-bold text-2xl">LOGO</h1>
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="border" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="border" />
                    </div>
                    <div className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full text-center">
                        <button>Login</button>
                    </div>
                </div>
            </div>
        </section>
    )
}