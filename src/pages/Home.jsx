import { useRef, useEffect, useState } from "react"

import loadActualUser from "../shared/actual-user/loadActualUser"
import loadScores from "../shared/scores/loadScores"
import loadTasks from "../shared/tasks/loadTasks"

import UserLevel from "../components/user/UserLevel"
import Header from "../components/layout/Header"
import NavBar from "../components/layout/NavBar"
import Tasks from "../components/tasks/Tasks"

export default function Home() {
    const [actualUser, setActualUser] = useState(null)
    const [scores, setScores] = useState(0)
    const [tasks, setTasks] = useState([])

    const mainRef = useRef(null)
    const [bottomPadding, setBottomPadding] = useState(0)

    useEffect(() => {
        if (mainRef.current) {
            const nav = document.querySelector("nav")
            const navHeight = nav ? nav.offsetHeight : 0
            setBottomPadding(navHeight + 16)
        }
    }, [])

    useEffect(() => {
        loadDatas()
    }, [])

    const loadDatas = () => {
        const user = loadActualUser()
        if (user) {
            setScores(loadScores(user))
            setTasks(loadTasks(user))
            setActualUser(user)
        }
    }

    return (
        <div
            className="min-h-screen flex flex-col bg-gray-50"
            style={{ paddingBottom: `${bottomPadding}px` }}
        >
            <main
                className="flex-1 w-full flex flex-col"
                ref={mainRef}
            >
                <Header tasks={tasks} setTasks={setTasks} />
                <section
                    className="flex-1 w-full flex flex-col p-4 gap-4
                        overflow-y-auto lg:w-255 lg:mx-auto"
                >
                    <UserLevel scores={scores} />
                    <Tasks
                        tasks={tasks}
                        setTasks={setTasks}
                        scores={scores}
                        setScores={setScores}
                    />
                </section>
            </main>

            <NavBar tasks={tasks} setTasks={setTasks} />
        </div>
    )
}
