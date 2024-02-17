import {citiesApi} from "../Api/citiesApi.jsx";

const reducers={
    [citiesApi.reducerPath]: citiesApi.reducer,
};
export  default  reducers;