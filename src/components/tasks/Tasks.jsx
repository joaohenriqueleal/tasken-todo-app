import { useEffect, useState } from 'react'

import loadActualUser from '../../shared/actual-user/loadActualUser'
import loadTasks from '../../shared/tasks/loadTasks'

import ButtonFizalizeDay from '../form/ButtonFizalizeDay'
import TaskItem from '../items/TaskItem'
import Legend from '../ui/Legend'
import Title from "../ui/Title"


export default function Tasks({ tasks, setTasks, scores, setScores }) {
    const [actualUser, setActualUser] = useState(null)

    useEffect(() => {
        const user = loadActualUser()
        if (user) {
            setTasks(loadTasks(user))
            setActualUser(user)
        }
    }, [])

    return (
        <div
            className="h-full bg-linear-to-r from-sky-50 to-sky-100 rounded-xl
                p-4 flex flex-col gap-8 anim-from-left"
        >
            <div className="flex justify-between">
                <Title
                    extraStyles='text-xl max-w-50'
                    text='SUAS TAREFAS DE HOJE'
                />
                <ButtonFizalizeDay
                    setTasks={setTasks}
                    tasks={tasks}
                    scores={scores}
                    setScores={setScores}
                />
            </div>
            <div
                className='flex flex-col gap-3'
            >
                {tasks.length > 0 ? (
                    tasks.map((t, i) => (
                        <TaskItem
                            setTasks={setTasks}
                            taskObject={t}
                            tasks={tasks}
                            key={i}
                        />
                    ))
                ) : (
                    <Legend
                        text='Nenhuma tarefa cadastrada.'
                    />
                )}
            </div>
        </div>
    )
}
