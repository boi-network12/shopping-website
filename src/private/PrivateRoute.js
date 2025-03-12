import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import LoadingDots from "../Loading/LoadingDots ";
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ element }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <LoadingDots/>

    return user ? element : <Navigate to="/" replace />
}

export default PrivateRoute;