import {ColorModeContext, useMode} from "./Dashboard/theme";
import "../node_modules/@milon27/react-sidebar/dist/react-sidebar.css";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";

 import {createBrowserRouter, RouterProvider} from "react-router-dom";
import dashboardRouter from "./Dashboard/DashboardRouter";

function App() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={createBrowserRouter([
                    dashboardRouter,
                ])}/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;