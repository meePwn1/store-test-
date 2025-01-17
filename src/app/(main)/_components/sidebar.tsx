'use client'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/utils/utils'

const Sidebar = () => {
	const pathName = usePathname()
	const [active, setActive] = useState(false)

	const toggleMenu = () => {
		setActive(!active)
	}

	const closeMenu = () => {
		setActive(false)
	}

	return (
		<div
			className={cn(
				'absolute bg-background md:sticky top-0 md:max-w-[11.25rem] w-full border-r border-solid md:min-h-dvh',
				!active && 'min-h-[3.125rem]'
			)}
		>
			<div className='text-right pr-4 pt-4 md:hidden'>
				<button onClick={toggleMenu}>
					<AlignJustify />
				</button>
			</div>

			<nav className={cn('md:flex flex-col gap-4 p-4 transition-all duration-300 hidden', active && 'flex')}>
				<Link href='/' className={pathName === '/' ? 'text-link' : ''} onClick={closeMenu}>
					Главная
				</Link>
				<Link href='/categories' className={pathName === '/categories' ? 'text-link' : ''} onClick={closeMenu}>
					Категории
				</Link>
				<Link href='/product' className={pathName === '/product' ? 'text-link' : ''} onClick={closeMenu}>
					Товар
				</Link>
				<Link href='/cart' className={pathName === '/cart' ? 'text-link' : ''} onClick={closeMenu}>
					Корзина
				</Link>
			</nav>
		</div>
	)
}

export default Sidebar
