import { useState, useEffect } from 'react'

import loadActualUser from '../../shared/actual-user/loadActualUser'
import saveTasks from '../../shared/tasks/saveTasks'

import ButtonRemoveTask from '../form/ButtonRemoveTask'
import ButtonEditTask from '../form/ButtonEditTask'

export default function TaskItem({ taskObject, tasks, setTasks }) {
    const [actualUser, setActualUser] = useState(null)

    useEffect(() => {
        const user = loadActualUser()
        if (user) setActualUser(user)
    }, [])

    const checkTask = () => {
        const newTaskList = tasks.map(t =>
            t.name === taskObject.name
                ? { ...t, completed: !t.completed }
                : t
        )
        saveTasks(actualUser, newTaskList)
        setTasks(newTaskList)
    }

    return (
        <div
            className="flex items-center justify-between p-4 px-6 
                       bg-sky-200 hover:bg-sky-300 transition-colors duration-200 
                       shadow-sm rounded-lg"
        >
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={taskObject.completed}
                    onChange={checkTask}
                    className="transform scale-150 accent-sky-500 cursor-pointer transition-all"
                />
                <p
                    className={`text-gray-800 font-medium truncate max-w-[180px] transition-all duration-200
                        ${taskObject.completed ? 'line-through text-gray-500' : ''}`}
                >
                    {taskObject.name}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-sky-900 font-semibold text-sm">+1 exp</p>
                <div className="flex items-center gap-2">
                    <ButtonRemoveTask tasks={tasks} setTasks={setTasks} taskObject={taskObject} />
                    <ButtonEditTask tasks={tasks} setTasks={setTasks} taskObject={taskObject} />
                </div>
            </div>
        </div>
    )
}
