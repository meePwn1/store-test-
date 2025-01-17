'use client'
import { TProduct } from '@/services/products/product.types'
import { selectCartItems, toggleCart } from '@/store/cart.slice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import Image from 'next/image'
import { toast } from 'sonner'

type Props = {
	product: TProduct
}

const Product = ({ product }: Props) => {
	const dispatch = useAppDispatch()
	const cart = useAppSelector(selectCartItems)
	const { title, description, id, thumbnail } = product
	const isProductInCart = cart.includes(id)

	const handleToggleCart = () => {
		dispatch(toggleCart(id))
		if (isProductInCart) {
			toast.success('Товар удален из корзины')
		} else {
			toast.success('Товар добавлен в корзину')
		}
	}

	return (
		<article className='border flex flex-col'>
			<div className='flex-1 p-2.5'>
				<Image src={thumbnail} alt={title} width={200} height={200} className='max-h-[6.25rem]  object-contain mb-2' />
				<h2 className='font-semibold text-center'>{title}</h2>
				<p className='text-sm'>{description}</p>
			</div>
			<div className='border-t text-center'>
				<button onClick={handleToggleCart} className='w-full h-full py-2 hover:bg-primary'>
					{isProductInCart ? 'Удалить' : 'В корзину'}
				</button>
			</div>
		</article>
	)
}

export default Product
