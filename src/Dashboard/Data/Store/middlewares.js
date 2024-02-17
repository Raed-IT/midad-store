import {citiesApi} from "../Api/citiesApi.jsx";

const middlewares = [
        citiesApi.middleware,
    ]
;
export default middlewares;