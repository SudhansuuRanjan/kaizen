import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Loader from "./Loader"


const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <div className="pt-16 flex justify-center items-center flex-col">
            <Loader />
        </div>
    }

    return loggedIn ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute