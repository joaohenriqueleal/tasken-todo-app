import { Link, useLocation } from 'react-router-dom'
import { FaTasks, FaCog, FaFolder, FaChartBar } from 'react-icons/fa'

import ButtonCreateTask from '../form/ButtonCreateTask'
import Legend from '../ui/Legend'

export default function NavBar({ tasks, setTasks }) {
    const location = useLocation()

    const path = location.pathname

    const isTarefas = path === '/' || path.endsWith('/todo-app') || path.endsWith('/todo-app/')
    const isConfig = path.includes('configuracoes')
    const isProjects = path.includes('projetos')
    const isEvolution = path.includes('evolucao')

    return (
        <nav
            className="fixed bottom-0 left-0 w-full z-999 text-white border
                text-center border-t-2 border-gray-400 bg-gray-50
                flex items-center justify-center gap-8"
        >
            <Link
                className={`nav-link-mobile ${isTarefas ? 'text-gray-500' : ''}`}
                to="/"
            >
                <FaTasks size={32} />
                <Legend extraStyles="text-sm font-bold" text="Tarefas" />
            </Link>
            <Link
                className={`nav-link-mobile ${isEvolution ? 'text-gray-500' : ''}`}
                to="/evolucao"
            >
                <FaChartBar size={32} />
                <Legend extraStyles="text-sm font-bold" text="Evolução" />
            </Link>
            <ButtonCreateTask
                tasks={tasks}
                setTasks={setTasks}
                isTasksPage={isTarefas}
            />
            <Link
                className={`nav-link-mobile ${isProjects ? 'text-gray-500' : ''}`}
                to="/projetos"
            >
                <FaFolder size={32} />
                <Legend extraStyles="text-sm font-bold" text="Projetos" />
            </Link>
            <Link
                className={`nav-link-mobile ${isConfig ? 'text-gray-500' : ''}`}
                to="/configuracoes"
            >
                <FaCog size={32} />
                <Legend extraStyles="text-sm font-bold" text="Perfil" />
            </Link>
        </nav>
    )
}
