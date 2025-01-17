import { CartList } from '@/app/(main)/cart/_components/cart-list'

const CartPage = () => {
	return (
		<div>
			<h1 className='text-2xl font-medium mb-4'>Товары в корзине</h1>
			<CartList />
		</div>
	)
}

export default CartPage
