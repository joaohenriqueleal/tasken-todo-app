import { useEffect, useState } from "react"

import loadActualUser from "../../shared/actual-user/loadActualUser"

import Title from "../ui/Title"

export default function UserLevel({ scores }) {
    const [actualUser, setActualUser] = useState(null)

    useEffect(() => {
        const user = loadActualUser()
        if (user) {
            setActualUser(user)
        }
    }, [])

    const level = Math.floor(scores / 50)
    const progress = (scores % 50) / 50

    const radius = 40
    const circumference = 2 * Math.PI * radius
    const offset = circumference - progress * circumference

    return (
        <div
            className="flex justify-between items-center bg-linear-to-r
                from-sky-50 to-sky-100 p-5 rounded-2xl shadow-md hover:shadow-lg
                transition-all duration-300 anim-from-left"
        >
            <div className="flex flex-col gap-2">
                <Title
                    text={actualUser ?? "Carregando..."}
                    extraStyles="text-gray-800 text-xl font-semibold"
                />
                <div
                    className="w-48 bg-gray-300 h-3 rounded-full overflow-hidden
                        mt-1"
                >
                    <div
                        className="bg-sky-500 h-full rounded-full transition-all
                            duration-500 ease-out"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>

                <p className="text-gray-600 text-sm font-medium">
                    {50 - (scores % 50)} exp até o próximo nível
                </p>
                <p className="text-gray-500 text-xs font-semibold">
                    {scores} exp totais
                </p>
            </div>

            <div className="flex flex-col items-center justify-center relative">
                <div className="relative w-28 h-28">
                    <svg
                        className="absolute top-0 left-0 w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#38bdf8"
                            strokeWidth="15"
                            fill="#fef08a"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="#f97316"
                            strokeWidth="15"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-out
                                drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]"
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-800 font-bold text-lg">
                            LVL. {level}
                        </span>
                    </div>
                </div>
                <p className="text-sm text-gray-700 mt-1 font-semibold">
                    {scores % 50}/50 EXP
                </p>
            </div>
        </div>
    )
}
