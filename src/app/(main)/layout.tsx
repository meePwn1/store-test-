import Sidebar from '@/app/(main)/_components/sidebar'
import { Header } from '@/app/components/sharing/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col w-full'>
			<Header />
			<main className='flex-1'>
				<div className='md:flex relative md:items-start'>
					<Sidebar />
					<section className='flex-1 md:pl-[1.9rem] min-w-0'>
						<div className='container px-[1.875rem] pt-[3.125rem]'>{children}</div>
					</section>
				</div>
			</main>
		</div>
	)
}
export default MainLayout
