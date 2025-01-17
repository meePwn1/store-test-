import { Cart } from '@/app/(main)/_components/cart'
import { HomePageProducts } from '@/app/(main)/_components/home-page-products'

const HomePage = async () => {
	return (
		<div>
			<Cart className='flex justify-end' />
			<h1 className='text-2xl font-medium mb-4'>Товары</h1>
			<HomePageProducts />
		</div>
	)
}

export default HomePage
