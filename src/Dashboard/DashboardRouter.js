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
import UsersPage from "./Pages/UsedrsPages/UsersPage";
import AddCategoryPage from "./Pages/CategoriesPages/AddCategoryPage";
import AddUserPage from "./Pages/UsedrsPages/AddUserPage";
import EditCategoryPage from "./Pages/CategoriesPages/EditCategoryPage";
import EditProductPage from "./Pages/ProductsPages/EditProductPage";
import ShowOrdersPage from "./Pages/OrdersPages/ShowOrderPage";

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
                path: dashboardRoutes.orders,
                element: <OrdersPage/>,
            },
            {
                path: dashboardRoutes.showOrders,
                element: <ShowOrdersPage/>,
            },
            {
                path: dashboardRoutes.users,
                element: <UsersPage/>,
            }, {
                path: dashboardRoutes.addUsers,
                element: <AddUserPage/>,
            },
            {
                path: dashboardRoutes.addProduct,
                element: <AddProductPage/>,
            },
            {
                path: dashboardRoutes.editProduct,
                element: <EditProductPage/>,
            },
            {
                path: dashboardRoutes.categories,
                element: <CategoriesPage/>,
            },
            {
                path: dashboardRoutes.editCategory,
                element: <EditCategoryPage/>,
            },
            {
                path: dashboardRoutes.addCategory,
                element: <AddCategoryPage/>,
            },


        ],

    },
        {
            path: dashboardRoutes.login,
            element: <LoginPage/>,

        }
    ];
export default dashboardRouter;