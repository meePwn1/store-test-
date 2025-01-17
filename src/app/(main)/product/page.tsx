import { CreateProduct } from '@/app/(main)/product/_components/create-product'
import { ProductTable } from '@/app/(main)/product/_components/product-table'
import { Button } from '@/app/components/ui/button'

const ProductPage = () => {
	return (
		<>
			<div className='text-right'>
				<CreateProduct>
					<Button>Создать товар +</Button>
				</CreateProduct>
			</div>
			<div className='overflow-x-auto'>
				<ProductTable />
			</div>
		</>
	)
}

export default ProductPage
