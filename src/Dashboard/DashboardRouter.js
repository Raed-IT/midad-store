import React from "react";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./Pages/Dashboard";
import dashboardRoutes from "./Data/DashboardRoutes";
import ProductsPage from "./Pages/ProductsPages/ProductsPage";
import AddProductPage from "./Pages/ProductsPages/addProductPage";
import CategoriesPage from "./Pages/CategoriesPages/CategoriesPage";
import OrdersPage from "./Pages/OrdersPages/OrdersPage";
import {ProtectedRoute} from "./components/ProtectedRouteComponent";
import {LoginPage} from "./Pages/authPages/loginPage";

const dashboardRouter =
    [{
        path: dashboardRoutes.dashboard,
        element: <ProtectedRoute> <DashboardLayout/></ProtectedRoute>,
        children: [
            {
                path: "",
                element: <DashboardPage/>,
            },
            {
                path: dashboardRoutes.products,
                element: <ProductsPage/>,
            },
            {
                path: dashboardRoutes.addProduct,
                element: <AddProductPage/>,
            },
            {
                path: dashboardRoutes.categories,
                element: <CategoriesPage/>,
            },

        ],
        errorElement: <>Not Found</>
    },
        {
            path: dashboardRoutes.login,
            element:<LoginPage/>
        }
    ];
export default dashboardRouter;