'use client'

import { selectCartItems } from '@/store/cart.slice'
import { useAppSelector } from '@/store/store'
import Link from 'next/link'
import { ComponentProps } from 'react'

export const Cart = (props: Omit<ComponentProps<typeof Link>, 'href'>) => {
	const cart = useAppSelector(selectCartItems)
	return (
		<Link {...props} href={'/cart'}>
			Корзинка ({cart.length})
		</Link>
	)
}
