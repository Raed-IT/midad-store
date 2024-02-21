import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import dashboardRoutes from "../Data/DashboardRoutes";

export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {token} = useAuth();
    if (!token) {
        navigate(dashboardRoutes.login);
    }
    return children;
};