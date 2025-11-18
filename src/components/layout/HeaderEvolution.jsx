import ChartSWDPD from '../charts/ChartSWDPD'


export default function HeaderEvolution({ days }) {
    return (
        <header className="p-4 bg-linear-to-r from-sky-600 to-sky-700">
            <div className='lg:w-200 mx-auto'>
                <ChartSWDPD days={days} />
            </div>
        </header>
    )
}
