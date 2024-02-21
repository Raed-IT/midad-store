import {ColorModeContext, useMode} from "./Dashboard/theme";
import "../node_modules/@milon27/react-sidebar/dist/react-sidebar.css";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";

import {BrowserRouter, createBrowserRouter, RouterProvider, useLocation} from "react-router-dom";
import dashboardRouter from "./Dashboard/DashboardRouter";
import store from "./Dashboard/Data/Store/store";
import {Provider} from "react-redux";
import {AuthProvider} from "./Dashboard/hooks/useAuth";
import {Toaster} from "react-hot-toast";
import Container from "@mui/material/Container";

function App() {

    const [theme, colorMode] = useMode();
    return (

        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>

                <Provider store={store}>
                    <AuthProvider>
                        <CssBaseline/>
                        <RouterProvider router={createBrowserRouter([
                            ...dashboardRouter,
                            {
                                path:'/',
                                errorElement:<Container width='100%'> Not Found </Container>,
                            }
                        ],)}/>

                    </AuthProvider>
                </Provider>
                <Toaster/>
            </ThemeProvider>
        </ColorModeContext.Provider>


    );
}

export default App;