import { useEffect, useState } from "react"
import Legend from "../ui/Legend"


export default function DailyTasksProgressBar({ tasks }) {
    const [barWidth, setBarWidth] = useState(0)

    useEffect(() => {
        setBarWidth(computeBarWidth())
    }, [tasks])

    const completedTasks = () => tasks.filter(t => t.completed).length

    const computeBarWidth = () => {
        const total = tasks.length
        if (total === 0) return 0
        return (completedTasks() / total) * 100
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-md mx-auto anim-from-left">
            <div className="w-full bg-white/30 h-4 rounded-full overflow-hidden">
                <div
                    className="bg-yellow-400 h-full rounded-full transition-all
                        duration-500 ease-out shadow-[0_0_10px_rgba(250,204,21,0.7)]"
                    style={{ width: `${barWidth}%` }}
                />
            </div>
            <Legend
                text={`${completedTasks()}/${tasks.length}`}
                extraStyles="text-white font-semibold text-sm self-end drop-shadow"
            />
        </div>
    )
}
