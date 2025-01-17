import { ComponentProps } from 'react'

import { cn } from '@/utils/utils'

const Root = ({ className, ...props }: ComponentProps<'table'>) => {
	return <table {...props} className={cn('min-w-full border-collapse border border-gray-300', className)} />
}

const Head = (props: ComponentProps<'thead'>) => {
	return <thead {...props} />
}

const Body = (props: ComponentProps<'tbody'>) => {
	return <tbody {...props} />
}

const Row = ({ className, ...props }: ComponentProps<'tr'>) => {
	return <tr {...props} className={cn('border-b border-gray-300', className)} />
}

const HeadCell = ({ className, ...props }: ComponentProps<'th'>) => {
	return <th {...props} className={cn('p-2 text-sm font-medium', className)} />
}

const Cell = ({ className, ...props }: ComponentProps<'td'>) => {
	return <td {...props} className={cn('p-2 text-sm', className)} />
}

export const Table = { Body, Cell, Head, HeadCell, Root, Row }
