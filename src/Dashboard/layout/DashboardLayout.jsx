import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {useState} from "react";

export default function DashboardLayout({children}) {
    const [isSidebar, setIsSidebar] = useState(true);
    return  <div className='app'>
        <Sidebar isSidebar={isSidebar}/>
        <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <div style={{paddingLeft: "20px"}}>

                <Outlet/>
            </div>
        </main>
    </div>
}
