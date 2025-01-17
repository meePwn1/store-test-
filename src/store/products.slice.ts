import { productsService } from '@/services/products/product.service'
import { TProduct, TProductCategory } from '@/services/products/product.types'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

type ProductsState = {
	products: Partial<TProduct>[]
	categoryList: string[]
	productCategories: TProductCategory[]
	cart: TProduct[]
	limit: number
}
const initialState: ProductsState = {
	products: [],
	categoryList: [],
	productCategories: [],
	cart: [],
	limit: 12,
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		updateProduct: (
			state,
			action: PayloadAction<
				Partial<{ id: number; title: string; description: string; category: string; thumbnail: string }>
			>
		) => {
			state.products.forEach(product => {
				if (product.id === action.payload.id) {
					product.title = action.payload.title
					product.description = action.payload.description
					product.category = action.payload.category
					product.thumbnail = action.payload.thumbnail
				}
			})
		},
		addProduct: (
			state,
			action: PayloadAction<{ title: string; description: string; category: string; thumbnail: string }>
		) => {
			state.products.unshift({
				id: state.products.length + 1,
				title: action.payload.title,
				description: action.payload.description,
				category: action.payload.category,
				thumbnail: action.payload.thumbnail,
			})
		},
		deleteProduct: (state, action: PayloadAction<number>) => {
			const index = state.products.findIndex(p => p.id === action.payload)
			if (index !== -1) {
				state.products.splice(index, 1)
			}
		},
		addCategory: (state, action: PayloadAction<string>) => {
			const category = action.payload
			if (!state.categoryList.includes(category)) {
				state.categoryList.push(category)
			} else {
				return
			}
		},
		updateCategory: (state, action: PayloadAction<{ id: number; newCategory: string }>) => {
			const { newCategory, id } = action.payload
			state.categoryList[id] = newCategory
		},
		deleteCategory: (state, action: PayloadAction<number>) => {
			state.categoryList.splice(action.payload, 1)
		},
	},
	selectors: {
		selectProducts: (state: ProductsState) => state.products,
		selectCategoryList: (state: ProductsState) => state.categoryList,
		selectProductCategories: (state: ProductsState) => state.productCategories,
		selectLimit: (state: ProductsState) => state.limit,
	},
	extraReducers: builder => {
		builder.addMatcher(isAnyOf(productsService.endpoints.fetchProducts.matchFulfilled), (state, action) => {
			state.products = action.payload.products
		}),
			builder.addMatcher(isAnyOf(productsService.endpoints.fetchProductCategories.matchFulfilled), (state, action) => {
				state.productCategories = action.payload
			}),
			builder.addMatcher(isAnyOf(productsService.endpoints.fetchCategoryList.matchFulfilled), (state, action) => {
				state.categoryList = action.payload
			})
	},
})

export const { addCategory, updateCategory, deleteCategory, deleteProduct, addProduct, updateProduct, setLimit } =
	productsSlice.actions
export const productsSelectors = productsSlice.selectors
