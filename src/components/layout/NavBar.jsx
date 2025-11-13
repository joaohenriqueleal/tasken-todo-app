import ButtonCreateTask from '../form/ButtonCreateTask'


export default function NavBar({ tasks, setTasks }) {
    return (
        <>
            <nav
                className="fixed bottom-0 left-0 w-full z-999 text-white border
                    text-center border-t-2 border-gray-400 bg-gray-50
                    flex items-center justify-center"
            >
                <ButtonCreateTask tasks={tasks} setTasks={setTasks} />
            </nav>
        </>
    )
}
