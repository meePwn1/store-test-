'use client'
import { ProductForm } from '@/app/(main)/product/_components/product-form'
import { Sheet, SheetContent, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet'
import { TProduct } from '@/services/products/product.types'
import { updateProduct } from '@/store/products.slice'
import { useAppDispatch } from '@/store/store'
import { useState } from 'react'

export const UpdateProduct = ({ children, product }: { children: React.ReactNode; product: Partial<TProduct> }) => {
	const [open, setOpen] = useState(false)
	const dispatch = useAppDispatch()

	const handleOnSubmit = (data: FormData) => {
		dispatch(
			updateProduct({
				id: product.id,
				category: data.get('category') as string,
				description: data.get('description') as string,
				thumbnail: data.get('image') as string,
				title: data.get('title') as string,
			})
		)
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetOverlay />
			<SheetContent>
				<SheetHeader className='mb-[3rem]'>
					<SheetTitle>Создание товара</SheetTitle>
				</SheetHeader>
				<ProductForm setModal={setOpen} onSubmit={handleOnSubmit} isUpdateForm defaultData={product} />
			</SheetContent>
		</Sheet>
	)
}
