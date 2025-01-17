import { cn } from '@/utils/utils'
import { ComponentPropsWithRef } from 'react'

export const Input = (props: ComponentPropsWithRef<'input'>) => {
	return (
		<input
			type='text'
			{...props}
			className={cn('w-full border border-input bg-background px-3 py-2 text-sm outline-none', props.className)}
		/>
	)
}
