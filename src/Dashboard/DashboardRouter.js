import React from "react";
import {Outlet} from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

const dashboardRouter =
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "",
                element: <>sdsd </>
            }, {
                path: "home",
                element: <>dashboard Home Page </>
            }

        ],
        errorElement: <>Not Found</>
    };
export default dashboardRouter;