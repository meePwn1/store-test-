'use client'

import { Button } from '@/app/components/ui/button'
import { FileUploader } from '@/app/components/ui/file-uploader'
import { Input } from '@/app/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Textarea } from '@/app/components/ui/textarea'
import { useFetchCategoryListQuery } from '@/services/products/product.service'
import { TProduct } from '@/services/products/product.types'
import { productsSelectors } from '@/store/products.slice'
import { useAppSelector } from '@/store/store'
import { useState, ChangeEvent, useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
	onSubmit: (data: FormData) => void
	setModal: (open: boolean) => void
	isUpdateForm?: boolean
	defaultData?: Partial<TProduct>
}

export const ProductForm = ({ onSubmit, setModal, isUpdateForm, defaultData }: Props) => {
	const [inputValue, setInputValue] = useState('')
	const [textAreaValue, setTextAreaValue] = useState('')
	const [select, setSelect] = useState('')
	const categories = useAppSelector(productsSelectors.selectCategoryList)
	const [image, setImage] = useState<null | string>(null)
	const {} = useFetchCategoryListQuery()

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaValue(e.target.value)
	}
	useEffect(() => {
		if (isUpdateForm && defaultData) {
			defaultData.title && setInputValue(defaultData.title)
			defaultData.description && setTextAreaValue(defaultData.description)
			defaultData.category && setSelect(defaultData.category)
			defaultData.thumbnail && setImage(defaultData.thumbnail)
		}
	}, [isUpdateForm, defaultData])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!inputValue.trim() || !textAreaValue.trim() || !select || !image) {
			toast.error('Пожалуйста, заполните все обязательные поля.')
			return
		}
		const formData = new FormData()
		formData.append('title', inputValue.trim())
		formData.append('description', textAreaValue.trim())
		formData.append('category', select)
		if (image) {
			formData.append('image', image)
		}
		onSubmit(formData)
		toast.success('Товар успешно создан')
		setModal(false)
	}

	const handleCancel = () => {
		setInputValue('')
		setTextAreaValue('')
		setSelect('')
		setImage(null)
		setModal(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			<label className='block mb-4'>
				<span className='text-red-500'>*</span>Категория
				<Select onValueChange={setSelect} defaultValue={defaultData?.category ? defaultData.category : ''}>
					<SelectTrigger>
						<SelectValue placeholder='Выберите категорию' />
					</SelectTrigger>
					<SelectContent className='bg-background'>
						{categories.map(category => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</label>
			<label className='block mb-4'>
				<span className='text-red-500'>*</span>Наименование товара
				<Input value={inputValue} onChange={handleInputChange} />
			</label>
			<label className='block mb-4'>
				<span className='text-red-500'>*</span>Описание
				<Textarea value={textAreaValue} onChange={handleTextAreaChange} />
			</label>
			<label className='inline-flex flex-col items-start mb-4'>
				<span className='text-red-500'>*</span>Фото
				<FileUploader setImageUrl={setImage} imageUrl={image} />
			</label>
			<div className='flex gap-4'>
				<Button className='bg-[#97FF8F]'>Сохранить</Button>
				<Button onClick={handleCancel} className='bg-[#FF8F91]'>
					Отменить
				</Button>
			</div>
		</form>
	)
}
