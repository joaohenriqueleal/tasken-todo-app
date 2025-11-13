import { useState, useEffect } from 'react'

import MessageError from '../windows/MessageError'
import Button from '../form/Button'

import loadActualUser from '../../shared/actual-user/loadActualUser'
import saveScores from '../../shared/scores/saveScores'
import saveTasks from '../../shared/tasks/saveTasks'


export default function ButtonFizalizeDay({ setTasks, tasks, scores, setScores }) {
    const [showMessageNTHC, setShowMessageNTHC] = useState(false)
    const [actualUser, setActualUser] = useState(null)
        
    useEffect(() => {
        const user = loadActualUser()
        if (user) setActualUser(user)
    }, [])
    
    const getTotalCompletedTasks = () => {
        let total = 0
        tasks.map((t) => {
            if (t.completed) total++
        })
        return total
    }

    const finalizeDay = (e) => {
        e.preventDefault()

        if (tasks.length == 0) {
            setShowMessageNTHC(true)
            return
        }

        const totalCompleted = getTotalCompletedTasks()

        saveScores(actualUser, scores + totalCompleted)
        setScores(scores + totalCompleted)
        saveTasks(actualUser, [])
        setTasks([])
    }

    return (
        <>
            <Button
                extraStyles='bg-sky-500 p-4 rounded shadow text-white font-bold
                    cursor-pointer hover:bg-sky-600 transform hover:scale-95 transition
                    durantion-300'
                handleClick={finalizeDay}
                text='Finalizar o dia'
            />
            {showMessageNTHC && (
                <MessageError
                    message='Erro! Nenhuma tarefa foi cadastrada ainda!'
                    setShow={setShowMessageNTHC}
                />
            )}
        </>
    )
}
