import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"

import Title from "../ui/Title"


export default function HeaderConfigurations({ actualUser, userPassword, scores }) {
    const [showPassword, setShowPassword] = useState(false)

    const level = Math.floor(scores / 50)
    const progress = (scores % 50) / 50

    const radius = 40
    const circumference = 2 * Math.PI * radius
    const offset = circumference - progress * circumference

    return (
        <header
            className="flex items-center justify-between bg-sky-600 p-6
                shadow-md border-b border-sky-700 lg:justify-center lg:gap-150"
        >
            <div className="flex flex-col gap-6 anim-from-left">
                <Title
                    extraStyles="text-white text-2xl tracking-wide"
                    text={actualUser}
                />
                <div className="flex flex-col text-white font-semibold text-lg">
                    <p className="opacity-90 text-sm tracking-wide">Senha</p>
                    <div className="flex items-center gap-3 mt-1">
                        <p
                            className="min-w-[110px] bg-white/10 px-3 py-1
                                rounded-md text-white 
                                tracking-wider backdrop-blur-sm"
                        >
                            {showPassword ? userPassword : "********"}
                        </p>

                        <button
                            className="p-2 rounded-full hover:bg-sky-500/50 
                                       transition duration-300 text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center anim-from-left">
                <div className="relative w-28 h-28">
                    <svg
                        className="absolute top-0 left-0 w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#7dd3fc"
                            strokeWidth="14"
                            fill="#fef9c3"
                            className="drop-shadow-sm"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#fb923c"
                            strokeWidth="14"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out
                                drop-shadow-[0_0_6px_rgba(251,146,60,0.7)]"
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-800 font-bold text-xl select-none">
                            LVL {level}
                        </span>
                    </div>
                </div>

                <p
                    className="text-sm text-gray-800 mt-2 font-semibold
                        tracking-wide"
                >
                    {scores % 50}/50 EXP
                </p>
            </div>
        </header>
    )
}
