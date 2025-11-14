import { useEffect, useRef, useState } from "react"
import { FaSync } from "react-icons/fa"

import loadActualUser from "../../shared/actual-user/loadActualUser"
import loadTasks from "../../shared/tasks/loadTasks"

import DailyTasksProgressBar from "../tasks/DailyTasksProgressBar"
import Legend from "../ui/Legend"
import Title from "../ui/Title"


export default function Header({ tasks, setTasks }) {
    const [actualUser, setActualUser] = useState(null)

    const btnReloadRef = useRef(null)

    useEffect(() => {
        loadDatas()
    }, [])

    const loadDatas = () => {
        const user = loadActualUser()
        if (user) {
            setTasks(loadTasks(user))
            setActualUser(user)
        }
    }

    const reloadDatas = () => {
        const btn = btnReloadRef.current
        btn.classList.add('anim-spin')
        btn.addEventListener("animationend", () => {
            btn.classList.remove('anim-spin')
        })

        const user = loadActualUser()
        if (user) {
            setTasks(loadTasks(user))
            setActualUser(user)
        }
    }

    return (
        <header
            className="bg-linear-to-r from-sky-600 to-sky-500 p-4 shadow-lg"
        >
            <div
                className="flex flex-col gap-5 lg:w-250 mx-auto anim-from-left"
            >
                <div className="flex items-center justify-between">
                    <Title
                        text={actualUser ? `Olá, ${actualUser}!` : "Carregando..."}
                        extraStyles="text-white text-2xl font-semibold anim-from-left"
                    />

                    <button
                        ref={btnReloadRef}
                        onClick={reloadDatas}
                        title="Recarregar dados"
                        className="text-white hover:bg-white/20 active:scale-95
                            p-2.5 rounded-full transition-all duration-300"
                    >
                        <FaSync size={18} />
                    </button>
                </div>

                <div
                    className="bg-white/15 backdrop-blur-sm p-4 rounded-2xl ]
                        shadow-inner"
                >
                    <Legend
                        extraStyles="text-white font-medium mb-3"
                        text="Progresso das tarefas de hoje:"
                    />
                    <DailyTasksProgressBar tasks={tasks} />
                </div>
            </div>
        </header>
    )
}
