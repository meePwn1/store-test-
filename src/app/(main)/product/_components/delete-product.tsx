'use client'
import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { deleteProduct } from '@/store/products.slice'
import { useAppDispatch } from '@/store/store'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
	data: { id: number; productTitle: string }
	children: React.ReactNode
}

export const DeleteProduct = ({ children, data }: Props) => {
	const { id } = data
	const [open, setOpen] = useState(false)
	const dispatch = useAppDispatch()

	const handleDeleteProduct = () => {
		dispatch(deleteProduct(id))
		toast.success(`Продукт успешно удален: ${data.productTitle}`)
		setOpen(false)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogOverlay />
			<DialogContent>
				<DialogHeader className='mb-5'>
					<DialogTitle>Удаление товара</DialogTitle>
				</DialogHeader>
				<DialogDescription>Вы уверены?</DialogDescription>
				<div className='flex gap-4 mt-5 justify-between'>
					<Button onClick={handleDeleteProduct} className='bg-red-500'>
						Удалить
					</Button>
					<Button onClick={handleCancel} className='bg-slate-400'>
						Отменить
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
