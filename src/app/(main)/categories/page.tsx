import { CategoriesTable } from '@/app/(main)/categories/_components/categories-table'
import { CreateCategory } from '@/app/(main)/categories/_components/create-category'
import { Button } from '@/app/components/ui/button'

const CategoriesPage = () => {
	return (
		<>
			<div className='text-right'>
				<CreateCategory>
					<Button>Создать категорию +</Button>
				</CreateCategory>
			</div>
			<div className='overflow-x-auto'>
				<CategoriesTable />
			</div>
		</>
	)
}

export default CategoriesPage
