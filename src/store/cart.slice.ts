import { deleteProduct } from '@/store/products.slice'
import { RootState } from '@/store/store'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
	cart: number[]
}
const initialState: CartState = {
	cart: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggleCart: (state, action: PayloadAction<number>) => {
			const index = state.cart.findIndex(id => id === action.payload)
			if (index === -1) {
				state.cart.push(action.payload)
			} else {
				state.cart.splice(index, 1)
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(deleteProduct, (state, action) => {
			const index = state.cart.findIndex(id => id === action.payload)
			if (index === -1) {
				state.cart.push(action.payload)
			} else {
				state.cart.splice(index, 1)
			}
		})
	},
})

export const selectCartItems = (state: RootState) => state.cart.cart
const selectProducts = (state: RootState) => state.products.products

export const selectCartWithDetails = createSelector([selectCartItems, selectProducts], (cartItems, products) => {
	return cartItems
		.map(cartItem => {
			const product = products.find(p => p.id === cartItem)
			return product ? product : null
		})
		.filter(Boolean)
})

export const { toggleCart } = cartSlice.actions
