import { useState, useEffect } from 'react'

import { FaTrash } from 'react-icons/fa'

import loadActualUser from '../../shared/actual-user/loadActualUser'
import saveTasks from '../../shared/tasks/saveTasks'


export default function ButtonRemoveTask({ setTasks, tasks, taskObject }) {
    const [actualUser, setActualUser] = useState(null)
        
    useEffect(() => {
        const user = loadActualUser()
        if (user) setActualUser(user)
    }, [])

    const deleteTask = () => {
        const newTasksList = tasks.filter(t => t.name != taskObject.name)
        setTasks(newTasksList)
        saveTasks(actualUser, newTasksList)
    }

    return (
        <button
            className='p-2 bg-red-600 rounded shadow text-white hover:bg-red-500
                cursor-pointer transition duration-300'
            onClick={deleteTask}
        >
            <FaTrash />
        </button>
    )
}
