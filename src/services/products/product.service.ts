import { baseApi } from '@/services/baseApi'
import { TProduct, TProductCategory, TProductsParams, TProductsResponse } from '@/services/products/product.types'

export const productsService = baseApi.injectEndpoints({
	endpoints: builder => ({
		fetchProducts: builder.query<TProductsResponse, TProductsParams>({
			query: (params?: TProductsParams) => ({
				params,
				url: '/products',
			}),
			providesTags: ['products'],
		}),
		fetchProductCategories: builder.query<TProductCategory[], void>({
			query: () => ({
				url: '/products/categories',
			}),
			providesTags: ['products'],
		}),
		fetchCategoryList: builder.query<string[], void>({
			query: () => ({
				url: '/products/category-list',
			}),
			providesTags: ['products'],
		}),
		addProduct: builder.mutation<TProduct, { title: string; category: string; description: string; photo: File }>({
			query: body => ({
				url: '/products/add',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['products'],
		}),
		updateProduct: builder.mutation<
			TProduct,
			{ id: string; title: string; category: string; description: string; photo: File }
		>({
			query: ({ id, ...product }) => ({
				url: `/products/${id}`,
				method: 'PUT',
				body: product,
			}),
			invalidatesTags: ['products'],
		}),
		deleteProduct: builder.mutation<TProduct, string>({
			query: id => ({
				url: `/products/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['products'],
		}),
	}),
})

export const {
	useFetchProductsQuery,
	useFetchProductCategoriesQuery,
	useFetchCategoryListQuery,
	useAddProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsService
