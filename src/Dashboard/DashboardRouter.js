import React from "react";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./Pages/Dashboard";

const dashboardRouter =
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                element: <DashboardPage/>,
            }, {
                path: "home",
                element: <>dashboard Home Page </>
            }

        ],
        errorElement: <>Not Found</>
    };
export default dashboardRouter;