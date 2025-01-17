'use client'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetOverlay,
	SheetTitle,
	SheetTrigger,
} from '@/app/components/ui/sheet'
import { productsSelectors, updateCategory } from '@/store/products.slice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

type Props = {
	data: { id: number; category: string }
	children: React.ReactNode
}

export const UpdateCategory = ({ children, data }: Props) => {
	const { category, id } = data
	const [value, setValue] = useState(category)
	const [open, setOpen] = useState(false)
	const dispatch = useAppDispatch()
	const categoryList = useAppSelector(productsSelectors.selectCategoryList)

	const handleCreateCategory = () => {
		if (value.trim() === '') return toast.error('Наименование категории не может быть пустым')
		if (categoryList.includes(value.trim())) return toast.error('Категория уже существует')
		dispatch(updateCategory({ id, newCategory: value.trim() }))
		toast.success('Категория успешно обновлена')
		setOpen(false)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetOverlay />
			<SheetContent>
				<SheetHeader className='mb-[12.5rem]'>
					<SheetTitle>Редактирование категории</SheetTitle>
				</SheetHeader>
				<SheetDescription>
					<label className='block mb-4'>
						Наименование категории
						<Input value={value} onChange={handleInputChange} />
					</label>
					<Button onClick={handleCreateCategory} className='bg-[#97FF8F]'>
						Сохранить
					</Button>
				</SheetDescription>
			</SheetContent>
		</Sheet>
	)
}
