import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {useEffect, useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import dashboardRoutes from "../Data/DashboardRoutes";
import toast from "react-hot-toast";

export default function DashboardLayout({children}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [token] = useLocalStorage('token');
    useEffect(() => {
            // toast.success(token)
            if (!token) {
                navigate(dashboardRoutes.login);
            }
        }
        ,
        [location]
    )
    ;

    const [isSidebar, setIsSidebar] = useState(true);
    return <div className='app'>
        <Sidebar isSidebar={isSidebar}/>
        <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <div style={{paddingLeft: "20px"}}>

                <Outlet/>
            </div>
        </main>
    </div>
}
