'use client'

import Product from '@/app/(main)/_components/product/product'
import { TProduct } from '@/services/products/product.types'

type Props = {
	products: TProduct[]
}

export const ProductGrid = ({ products }: Props) => {
	return (
		<div className='grid grid-cols-[repeat(auto-fill,minmax(13.4375rem,1fr))] gap-10'>
			{products?.map(product => (
				<Product product={product} key={product.id} />
			))}
		</div>
	)
}
