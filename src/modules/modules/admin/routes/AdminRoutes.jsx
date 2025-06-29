import { AdminPages } from '../pages'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminPages />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
