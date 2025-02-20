'use client'

import { ProductGrid } from '@/app/(main)/_components/product/product-grid'
import { useFetchProductsQuery } from '@/services/products/product.service'
import { TProduct } from '@/services/products/product.types'
import { productsSelectors, setLimit } from '@/store/products.slice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const HomePageProducts = () => {
	const products = useAppSelector(productsSelectors.selectProducts)
	const limit = useAppSelector(productsSelectors.selectLimit)
	const dispatch = useAppDispatch()
	const { ref, inView } = useInView({ threshold: 0 })
	const { isLoading, isFetching, data } = useFetchProductsQuery({ limit })

	useEffect(() => {
		if (inView && data && data?.total > limit) {
			dispatch(setLimit(limit + 12))
		}
	}, [inView])

	if (isLoading) return <div>Загрузка данных. . .</div>
	if (products.length === 0) return <div>Пока нет товаров</div>

	return (
		<div className='pb-[12.5rem]'>
			<ProductGrid products={products as TProduct[]} />
			<div ref={ref} className='text-center mt-[6.25rem]'>
				{isFetching && 'Загрузка данных...'}
			</div>
		</div>
	)
}
