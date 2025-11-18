import { useState, useEffect } from "react"

import { FaSignOutAlt, FaTrash, FaPen } from 'react-icons/fa'

import loadActualUser from "../shared/actual-user/loadActualUser"
import saveActualUser from '../shared/actual-user/saveActualUser'
import loadScores from '../shared/scores/loadScores'
import saveScores from '../shared/scores/saveScores'
import loadUsers from '../shared/users/loadUsers'
import loadTasks from "../shared/tasks/loadTasks"
import saveTasks from "../shared/tasks/saveTasks"
import saveUsers from '../shared/users/saveUsers'
import loadDays from "../shared/days/loadDays"
import saveDays from '../shared/days/saveDays'

import HeaderConfigurations from "../components/layout/HeaderConfigurations"
import WindowSingleInput from "../components/windows/WindowSingleInput"
import MessageError from "../components/windows/MessageError"
import NavBar from "../components/layout/NavBar"


export default function Configurations({ setAuth }) {
    const [showMessageUAE, setShowMessageUAE] = useState(false)
    const [showMessageEP, setShowMessageEP] = useState(false)
    const [showMessageII, setShowMessageII] = useState(false)
    const [showMessageIP, setShowMessageIP] = useState(false)

    const [showWindowEP, setShowWindowEP] = useState(false)
    const [showWindowADU, setShowWindowADU] = useState(false)

    const [userPassword, setUserPassword] = useState('')
    const [actualUser, setActualUser] = useState(null)
    const [scores, setScores] = useState(0)
    const [days, setDays] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        const user = loadActualUser()
        if (user) {
            setScores(loadScores(user))
            setUsers(loadUsers())
            setActualUser(user)
            setDays(loadDays(user))
        }
    }, [])

    useEffect(() => {
        if (!actualUser || users.length === 0) return

        const user = users.find(u => u.username === actualUser)

        if (user) {
            setUserPassword(user.password)
        }
    }, [actualUser, users])

    const editProfile = (newProfileName) => {
        const name = newProfileName.trim()

        if (!name) {
            setShowMessageII(true)
            return
        }

        const updatedUsers = users.map((u) =>
            u.username === actualUser
                ? { ...u, username: name }
                : u
        )

        let total = 0
        updatedUsers.map((u) => {
            if (u.username == name) {
                total += 1
            }
        })

        if (total >= 2) {
            setShowMessageUAE(true)
            return
        }

        const userTasks = loadTasks(actualUser)
        saveTasks(newProfileName, userTasks)
        localStorage.removeItem(`${actualUser}:tasks`)

        saveScores(newProfileName, scores)
        localStorage.removeItem(`${actualUser}:scores`)

        saveDays(newProfileName, days)
        localStorage.removeItem(`${actualUser}:days`)

        saveActualUser(name)
        saveUsers(updatedUsers)
        setActualUser(name)
        setUsers(updatedUsers)
        setShowMessageEP(true)
    }

    const logOut = () => {
        setAuth(false)
    }

    const deleteUser = (userPassword) => {
        const user = users.find(u => u.username == actualUser)

        if (userPassword == user.password) {
            const newUsersList = users.filter(u => u.username != actualUser)
    
            localStorage.removeItem(`${actualUser}:tasks`)
            localStorage.removeItem(`${actualUser}:scores`)
            localStorage.removeItem(`${actualUser}:days`)

            setUsers(newUsersList)
            saveUsers(newUsersList)
            setAuth(false)
            return
        }

        setShowMessageIP(true)
    }

    return (
        <div className="flex flex-col">
            <HeaderConfigurations
                userPassword={userPassword}
                actualUser={actualUser}
                scores={scores}
            />
            <main
                className="flex flex-col gap-4 p-2 text-white font-bold py-6
                    lg:w-225 lg:m-auto"
            >
                <section
                    className="bg-linear-to-r from-sky-500 to-sky-600 p-4 rounded-xl
                        shadow-xl flex justify-between anim-from-left"
                >
                    <p className="w-1/2">
                        Pressione o botão ao lado pra editar o seu nome de perfil
                    </p>
                    <button
                        className='bg-sky-400 p-4 w-30 shadow hover:bg-sky-300
                            cursor-pointer transition duration-300 rounded-2xl flex
                            items-center justify-center gap-2'
                        onClick={() => setShowWindowEP(true)}
                        text=''
                    >
                        <FaPen /> Editar
                    </button>
                </section>
                <section
                    className="bg-linear-to-r from-sky-500 to-sky-600 p-4 rounded-xl
                        shadow-xl flex justify-between anim-from-left"
                >
                    <p className="w-1/2">
                        Pressione o botão ao lado pra Sair da sua conta
                    </p>
                    <button
                        className="p-4 bg-sky-400 w-30 rounded-2xl shadow 
                            cursor-pointer transition duration-300 flex
                            hover:bg-sky-300 items-center gap-2 justify-center
                            hover:text-white"
                        onClick={logOut}
                    >
                        <FaSignOutAlt /> Sair
                    </button>
                </section>
                <section
                    className="bg-linear-to-r from-sky-700 to-sky-900 p-4 rounded-xl
                        shadow-2xl flex justify-between anim-from-left"
                >
                    <p className="w-1/2">
                        Pressione o botão ao lado pra deletar seu usuário
                    </p>
                    <button
                        className="p-4 bg-red-600 w-30 rounded-2xl shadow hover:bg-red-500
                            cursor-pointer transition duration-300 flex items-center
                            gap-2 justify-center text-white"
                        onClick={() => setShowWindowADU(true)}
                    >
                        <FaTrash /> Excluir
                    </button>
                </section>
            </main>
            <NavBar />
            {showWindowEP && (
                <WindowSingleInput
                    placeholder='Insira o novo nome de usuário'
                    title='Editar nome de usuário'
                    setShow={setShowWindowEP}
                    action={editProfile}
                    label='Usuário:'
                    id='inputEP'
                    type='text'
                />
            )}
            {showWindowADU && (
                <WindowSingleInput
                    placeholder='Insira sua senha'
                    title='Excluir usuário'
                    setShow={setShowWindowADU}
                    action={deleteUser}
                    type='password'
                    label='Senha:'
                    id='inputDU'
                />
            )}
            {showMessageII && (
                <MessageError
                    message='Por favor, preencha todos os campo corretamente!'
                    setShow={setShowMessageII}
                />
            )}
            {showMessageEP && (
                <MessageError
                    message='Perfil editado com sucesso!'
                    setShow={setShowMessageEP}
                />
            )}
            {showMessageUAE && (
                <MessageError
                    message='Já existe um usuário com esse nome!'
                    setShow={setShowMessageUAE}
                />
            )}
            {showMessageIP && (
                <MessageError
                    message='Senha incorreta!'
                    setShow={setShowMessageIP}
                />
            )}
        </div>
    )
}
