import { useState, useEffect } from 'react'

import { FaPen } from 'react-icons/fa'

import loadActualUser from '../../shared/actual-user/loadActualUser'
import saveTasks from '../../shared/tasks/saveTasks'

import WindowSingleInput from '../windows/WindowSingleInput'
import MessageError from '../windows/MessageError'


export default function ButtonEditTask({ setTasks, tasks, taskObject }) {
    const [showMessageTNAU, setShowMessageTNAU] = useState(false)
    const [showMessageNAWS, setShowMessageNAWS] = useState(false)
    const [showMessageII, setShowMessageII] = useState(false)
    const [showWindowNTN, setshowWindowNTN] = useState('')

    const [actualUser, setActualUser] = useState(null)
    
    useEffect(() => {
        const user = loadActualUser()
        if (user) setActualUser(user)
    }, [])

    const editTask = (newTaskName) => {
        const exits = tasks.find(t => t.name == newTaskName)

        if (!newTaskName) {
            setShowMessageII(true)
            return
        }

        if (exits) {
            setShowMessageTNAU(true)
            return
        }

        const newTaskList = tasks.map(t =>
            t.name === taskObject.name
                ? { ...t, name: newTaskName.trim() }
                : t
        )
        saveTasks(actualUser, newTaskList)
        setTasks(newTaskList)
        setShowMessageNAWS(true)
    }

    return (
        <>
            <button
                className='p-2 bg-sky-700 rounded shadow text-white hover:bg-sky-500
                    cursor-pointer transition duration-300'
                onClick={() => setshowWindowNTN(true)}
            >
                <FaPen />
            </button>
            {showWindowNTN && (
                <WindowSingleInput
                    placeholder='Insira o nome nome da tarefa'
                    setShow={setshowWindowNTN}
                    label='Nome da tarefa:'
                    title='Editar Tarefa'
                    id='inputNewTaskName'
                    action={editTask}
                    type='text'
                />
            )}
            {showMessageII && (
                <MessageError
                    message='Por favor, preencha todos os campos!'
                    setShow={setShowMessageII}
                />
            )}
            {showMessageTNAU && (
                <MessageError
                    message='Esse nome já está sendo ultilizado!'
                    setShow={setShowMessageTNAU}
                />
            )}
            {showMessageNAWS && (
                <MessageError
                    message='Nome da tarefa alterado com sucesso!'
                    setShow={setShowMessageNAWS}
                />
            )}
        </>
    )
}
