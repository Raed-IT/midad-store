import {ColorModeContext, useMode} from "./Dashboard/theme";
import "../node_modules/@milon27/react-sidebar/dist/react-sidebar.css";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";

import Sidebar from "./Dashboard/layout/Sidebar";
import Topbar from "./Dashboard/layout/Topbar";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Sidebar isSidebar={isSidebar}/>
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar}/>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;