import {citiesApi} from "../Api/citiesApi.jsx";
import {statisticsApi} from "../Api/StatisticsApi";
import {productsApi} from "../Api/ProductsApi";
import {categoriesApi} from "../Api/CategoriesApi";
import {authApi} from "../Api/authApi";
import {usersApi} from "../Api/usersApi";
import {ordersApi} from "../Api/ordersApi";

const reducers = {
    [authApi.reducerPath]: authApi.reducer,
    [citiesApi.reducerPath]: citiesApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
};
export default reducers;