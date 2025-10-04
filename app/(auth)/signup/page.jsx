import Link from "next/link";

export default function Page() {

    const country = [
        { name: "Afghanistan" },
        { name: "Albania" },
        { name: "Algeria" },
        { name: "Andorra" },
        { name: "Angola" },
        { name: "Antigua and Barbuda" },
        { name: "Argentina" },
        { name: "Armenia" },
        { name: "Australia" },
        { name: "Austria" },
        { name: "Azerbaijan" },
        { name: "Bahamas" },
        { name: "Bahrain" },
        { name: "Bangladesh" },
        { name: "Barbados" },
        { name: "Belarus" },
        { name: "Belgium" },
        { name: "Belize" },
        { name: "Benin" },
        { name: "Bhutan" },
        { name: "Bolivia" },
        { name: "Bosnia and Herzegovina" },
        { name: "Botswana" },
        { name: "Brazil" },
        { name: "Brunei" },
        { name: "Bulgaria" },
        { name: "Burkina Faso" },
        { name: "Burundi" },
        { name: "Cabo Verde" },
        { name: "Cambodia" },
        { name: "Cameroon" },
        { name: "Canada" },
        { name: "Central African Republic" },
        { name: "Chad" },
        { name: "Chile" },
        { name: "China" },
        { name: "Colombia" },
        { name: "Comoros" },
        { name: "Congo, Democratic Republic of the" },
        { name: "Congo, Republic of the" },
        { name: "Costa Rica" },
        { name: "Croatia" },
        { name: "Cuba" },
        { name: "Cyprus" },
        { name: "Czech Republic" },
        { name: "Denmark" },
        { name: "Djibouti" },
        { name: "Dominica" },
        { name: "Dominican Republic" },
        { name: "Ecuador" },
        { name: "Egypt" },
        { name: "El Salvador" },
        { name: "Equatorial Guinea" },
        { name: "Eritrea" },
        { name: "Estonia" },
        { name: "Eswatini" },
        { name: "Ethiopia" },
        { name: "Fiji" },
        { name: "Finland" },
        { name: "France" },
        { name: "Gabon" },
        { name: "Gambia" },
        { name: "Georgia" },
        { name: "Germany" },
        { name: "Ghana" },
        { name: "Greece" },
        { name: "Grenada" },
        { name: "Guatemala" },
        { name: "Guinea" },
        { name: "Guinea-Bissau" },
        { name: "Guyana" },
        { name: "Haiti" },
        { name: "Honduras" },
        { name: "Hungary" },
        { name: "Iceland" },
        { name: "India" },
        { name: "Indonesia" },
        { name: "Iran" },
        { name: "Iraq" },
        { name: "Ireland" },
        { name: "Israel" },
        { name: "Italy" },
        { name: "Jamaica" },
        { name: "Japan" },
        { name: "Jordan" },
        { name: "Kazakhstan" },
        { name: "Kenya" },
        { name: "Kiribati" },
        { name: "Korea, North" },
        { name: "Korea, South" },
        { name: "Kosovo" },
        { name: "Kuwait" },
        { name: "Kyrgyzstan" },
        { name: "Laos" },
        { name: "Latvia" },
        { name: "Lebanon" },
        { name: "Lesotho" },
        { name: "Liberia" },
        { name: "Libya" },
        { name: "Liechtenstein" },
        { name: "Lithuania" },
        { name: "Luxembourg" },
        { name: "Madagascar" },
        { name: "Malawi" },
        { name: "Malaysia" },
        { name: "Maldives" },
        { name: "Mali" },
        { name: "Malta" },
        { name: "Marshall Islands" },
        { name: "Mauritania" },
        { name: "Mauritius" },
        { name: "Mexico" },
        { name: "Micronesia" },
        { name: "Moldova" },
        { name: "Monaco" },
        { name: "Mongolia" },
        { name: "Montenegro" },
        { name: "Morocco" },
        { name: "Mozambique" },
        { name: "Myanmar" },
        { name: "Namibia" },
        { name: "Nauru" },
        { name: "Nepal" },
        { name: "Netherlands" },
        { name: "New Zealand" },
        { name: "Nicaragua" },
        { name: "Niger" },
        { name: "Nigeria" },
        { name: "North Macedonia" },
        { name: "Norway" },
        { name: "Oman" },
        { name: "Pakistan" },
        { name: "Palau" },
        { name: "Palestine" },
        { name: "Panama" },
        { name: "Papua New Guinea" },
        { name: "Paraguay" },
        { name: "Peru" },
        { name: "Philippines" },
        { name: "Poland" },
        { name: "Portugal" },
        { name: "Qatar" },
        { name: "Romania" },
        { name: "Russia" },
        { name: "Rwanda" },
        { name: "Saint Kitts and Nevis" },
        { name: "Saint Lucia" },
        { name: "Saint Vincent and the Grenadines" },
        { name: "Samoa" },
        { name: "San Marino" },
        { name: "Sao Tome and Principe" },
        { name: "Saudi Arabia" },
        { name: "Senegal" },
        { name: "Serbia" },
        { name: "Seychelles" },
        { name: "Sierra Leone" },
        { name: "Singapore" },
        { name: "Slovakia" },
        { name: "Slovenia" },
        { name: "Solomon Islands" },
        { name: "Somalia" },
        { name: "South Africa" },
        { name: "South Sudan" },
        { name: "Spain" },
        { name: "Sri Lanka" },
        { name: "Sudan" },
        { name: "Suriname" },
        { name: "Sweden" },
        { name: "Switzerland" },
        { name: "Syria" },
        { name: "Taiwan" },
        { name: "Tajikistan" },
        { name: "Tanzania" },
        { name: "Thailand" },
        { name: "Timor-Leste" },
        { name: "Togo" },
        { name: "Tonga" },
        { name: "Trinidad and Tobago" },
        { name: "Tunisia" },
        { name: "Turkey" },
        { name: "Turkmenistan" },
        { name: "Tuvalu" },
        { name: "Uganda" },
        { name: "Ukraine" },
        { name: "United Arab Emirates" },
        { name: "United Kingdom" },
        { name: "United States" },
        { name: "Uruguay" },
        { name: "Uzbekistan" },
        { name: "Vanuatu" },
        { name: "Vatican City" },
        { name: "Venezuela" },
        { name: "Vietnam" },
        { name: "Yemen" },
        { name: "Zambia" },
        { name: "Zimbabwe" },

    ]

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
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="font-medium text-sm text-gray-700"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="font-medium text-sm text-gray-700"
                        >
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Country Selection */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="country"
                            className="font-medium text-sm text-gray-700"
                        >
                            Country <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="country"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            required
                        >
                            <option value="">Select your country</option>
                            {country?.map((item) => (
                                <option value={item?.name} key={item?.name}>{item?.name}</option>
                            ))}
                        </select>
                    </div>


                    {/* Button */}
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