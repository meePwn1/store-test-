'use client'

import { DeleteProduct } from '@/app/(main)/product/_components/delete-product'
import { UpdateProduct } from '@/app/(main)/product/_components/update-product'
import { TableHeader } from '@/app/components/sharing/table-header'
import { Table } from '@/app/components/ui/table'
import { useFetchProductsQuery } from '@/services/products/product.service'
import { productsSelectors, setLimit } from '@/store/products.slice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const columns = ['№', 'Наименование', 'Категория', '']
export const ProductTable = () => {
	const products = useAppSelector(productsSelectors.selectProducts)
	const limit = useAppSelector(productsSelectors.selectLimit)
	const dispatch = useAppDispatch()
	const { ref, inView } = useInView({ threshold: 0 })
	const { data, isFetching, isLoading } = useFetchProductsQuery({ limit })

	useEffect(() => {
		if (inView && data && data?.total > limit) {
			dispatch(setLimit(limit + 12))
		}
	}, [inView])

	if (isLoading) return <div>Загрузка данных. . .</div>
	return (
		<div className='pb-[12.5rem]'>
			<h2>Созданные категории</h2>
			<Table.Root>
				<TableHeader columnsName={columns} />
				<Table.Body>
					{products.map((item, index) => (
						<Table.Row key={item.id} className='hover:bg-cyan-50'>
							<Table.Cell>{index + 1}</Table.Cell>
							<Table.Cell className='flex gap-3 items-center md:whitespace-nowrap'>
								<Image src={item.thumbnail as string} width={30} height={30} alt={item.title as string} /> {item.title}
							</Table.Cell>
							<Table.Cell className='md:w-[50%]'>{item.category}</Table.Cell>
							<Table.Cell className='flex gap-3 justify-end'>
								<UpdateProduct product={item}>
									<button>
										<Pencil />
									</button>
								</UpdateProduct>

								<DeleteProduct data={{ id: item.id as number, productTitle: item.title as string }}>
									<button>
										<Trash />
									</button>
								</DeleteProduct>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			<div ref={ref} className='text-center mt-[6.25rem]'>
				{isFetching && 'Загрузка данных...'}
			</div>
		</div>
	)
}
