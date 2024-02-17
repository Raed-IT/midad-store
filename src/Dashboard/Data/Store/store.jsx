import {configureStore} from "@reduxjs/toolkit"
import reducers from "./reducers.js";
import middlewares from "./middlewares.js";

const store = configureStore(
    {
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(middlewares)
    }
);
export default store;