'use client'

import { DeleteCategory } from '@/app/(main)/categories/_components/delete-category'
import { UpdateCategory } from '@/app/(main)/categories/_components/update-category'
import { TableHeader } from '@/app/components/sharing/table-header'
import { Table } from '@/app/components/ui/table'
import { useFetchCategoryListQuery } from '@/services/products/product.service'
import { productsSelectors } from '@/store/products.slice'
import { useAppSelector } from '@/store/store'
import { Pencil, Trash } from 'lucide-react'

const columns = ['№', 'Наименование', '']
export const CategoriesTable = () => {
	const categoryList = useAppSelector(productsSelectors.selectCategoryList)
	const { isLoading } = useFetchCategoryListQuery()

	if (isLoading) return <div>Загрузка данных. . .</div>
	return (
		<div>
			<h2>Созданные категории</h2>
			<Table.Root>
				<TableHeader columnsName={columns} />
				<Table.Body>
					{categoryList.map((item, index) => (
						<Table.Row key={index} className='hover:bg-cyan-50'>
							<Table.Cell>{index + 1}</Table.Cell>
							<Table.Cell>{item}</Table.Cell>
							<Table.Cell className='flex gap-3 justify-end'>
								<UpdateCategory data={{ id: index, category: item }}>
									<button>
										<Pencil />
									</button>
								</UpdateCategory>
								<DeleteCategory data={{ id: index, category: item }}>
									<button>
										<Trash />
									</button>
								</DeleteCategory>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	)
}
