import { baseApi } from '@/services/baseApi'
import { cartSlice } from '@/store/cart.slice'
import { productsSlice } from '@/store/products.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit/react'
import { useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
})

export const makeStore = () => {
	return configureStore({
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
		reducer: rootReducer,
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
