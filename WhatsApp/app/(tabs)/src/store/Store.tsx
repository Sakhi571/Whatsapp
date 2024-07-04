import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { GetApi } from '../slice/GetApi'

export const  store = configureStore({
    reducer:{
        [GetApi.reducerPath]: GetApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(GetApi.middleware),
    })
    setupListeners(store.dispatch)
