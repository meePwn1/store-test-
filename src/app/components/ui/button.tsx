import { cn } from '@/utils/utils'
import { ComponentPropsWithRef } from 'react'

type Props = ComponentPropsWithRef<'button'>

export const Button = ({ className, ...props }: Props) => {
	return (
		<button
			{...props}
			className={cn(
				'whitespace-nowrap bg-primary inline-flex items-center justify-center py-[.625rem] px-[.875rem] md:pr-[2.8125rem] ',
				className
			)}
		/>
	)
}
