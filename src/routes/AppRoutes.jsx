import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "../hooks"
import { LoginPages } from "../auth";
import { ModuleRoutes } from "../modules";

export const AppRoutes = () => {

    const {
        user,
        status,
    } = useAuthStore();

    console.log(user.rol, status);

    if (status === 'checking') return <div>Loading...</div>;

    return (
        <Routes>
            {(status === 'authenticated') ?
                (
                    <>
                        <Route path="/*" element={<ModuleRoutes />} />
                        <Route path="/auth/*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/auth/*" element={<LoginPages />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
                )}

        </Routes>
    )
}
