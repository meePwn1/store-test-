'use client'
import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { deleteCategory } from '@/store/products.slice'
import { useAppDispatch } from '@/store/store'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
	data: { id: number; category: string }
	children: React.ReactNode
}

export const DeleteCategory = ({ children, data }: Props) => {
	const { id } = data
	const [open, setOpen] = useState(false)
	const dispatch = useAppDispatch()

	const handleDeleteCategory = () => {
		dispatch(deleteCategory(id))
		toast.success(`Категория успешно удалена: ${data.category}`)
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
					<DialogTitle>Удаление категории</DialogTitle>
				</DialogHeader>
				Вы уверены?
				<div className='flex gap-4 mt-5 justify-between'>
					<Button onClick={handleDeleteCategory} className='bg-red-500'>
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
