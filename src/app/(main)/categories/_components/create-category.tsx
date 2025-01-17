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
import { addCategory } from '@/store/products.slice'
import { useAppDispatch } from '@/store/store'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

export const CreateCategory = ({ children }: { children: React.ReactNode }) => {
	const [value, setValue] = useState('')
	const [open, setOpen] = useState(false)
	const dispatch = useAppDispatch()

	const handleCreateCategory = () => {
		if (value.trim() === '') return toast.error('Наименование категории не может быть пустым')
		dispatch(addCategory(value.trim()))
		toast.success('Категория успешно создана')
		setValue('')
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
					<SheetTitle>Создание категории</SheetTitle>
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
