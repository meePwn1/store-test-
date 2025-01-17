'use client'

import { ProductGrid } from '@/app/(main)/_components/product/product-grid'
import { TProduct } from '@/services/products/product.types'
import { selectCartWithDetails } from '@/store/cart.slice'
import { useAppSelector } from '@/store/store'

export const CartList = () => {
	const card = useAppSelector(selectCartWithDetails) as TProduct[]

	if (card.length === 0) return <div>Ваша корзина пуста</div>
	return <ProductGrid products={card} />
}
