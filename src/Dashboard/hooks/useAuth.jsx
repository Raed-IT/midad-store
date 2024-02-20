import {createContext, useContext, useEffect, useMemo} from "react";
 import {useLocalStorage} from "./useLocalStorage";
import {Navigate} from "react-router-dom";
import {useLoginMutation} from "../Data/Api/authApi";
import dashboardRoutes from "../Data/DashboardRoutes";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);

    const [loginRequest, {
        data: responseUser,
        isLoading: isLogin,
        isSuccess: isSuccessLogin,
        error: getLoginError,
    }] = useLoginMutation();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        loginRequest(data).unwrap()
            .then((payload) => {
                setToken(payload.token);
                setUser(payload?.user);
                console.log(token)
            })
            .catch((error) => toast.error(error?.data.message));

    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        setToken(null);
        // navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            token,
            login,
            logout,
        }),
        [token]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};