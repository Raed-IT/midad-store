import {citiesApi} from "../Api/citiesApi.jsx";
import {statisticsApi} from "../Api/StatisticsApi";
import {productsApi} from "../Api/ProductsApi";
import {categoriesApi} from "../Api/CategoriesApi";
import {authApi} from "../Api/authApi";
import {usersApi} from "../Api/usersApi";

const middlewares = [
        authApi.middleware,
        citiesApi.middleware,
        statisticsApi.middleware,
        productsApi.middleware,
        categoriesApi.middleware,
        usersApi.middleware,
    ]
;
export default middlewares;