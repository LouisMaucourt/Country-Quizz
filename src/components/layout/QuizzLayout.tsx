import { Outlet } from 'react-router-dom'

export const QuizzLayout = () => (
    <div className="min-h-screen w-screen flex flex-col">
        <Outlet />
    </div>
)