import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type Props = {
	accept?: string
	className?: string
	setFile?: (file: File) => void
	setImageUrl?: (dataUrl: string) => void
	imageUrl?: string | null
}

export const FileUploader = (props: Props) => {
	const { accept = 'image/*,.png,.jpg,.jpeg,.webp', setFile, setImageUrl } = props
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (props.imageUrl) {
			setImagePreview(props.imageUrl)
		}
	}, [props.imageUrl])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		e.target.value = ''

		if (file && file.size <= 5 * 1024 * 1024) {
			setFile?.(file)
			if (setImageUrl) {
				const reader = new FileReader()

				reader.onload = () => {
					const dataUrl = reader.result?.toString() || ''

					setImageUrl(dataUrl)
					setImagePreview(dataUrl)
				}

				reader.readAsDataURL(file)
			}
		} else {
			toast.error('Max image size is 5MB')
		}
	}

	return (
		<>
			<button
				type='button'
				className={`border inline-block min-w-[6.25rem] min-h-20`}
				onClick={() => inputRef.current?.click()}
			>
				{imagePreview && <Image src={imagePreview} alt={'foto'} width={100} height={80} />}
			</button>
			<input accept={accept} hidden onChange={handleChange} ref={inputRef} style={{ display: 'none' }} type={'file'} />
		</>
	)
}
