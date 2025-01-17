import StoreProvider from '@/app/providers/store-provider'
import { Toaster } from 'sonner'

const Providers = async ({ children }: { children: React.ReactNode }) => {
	return (
		<StoreProvider>
			{children}
			<Toaster position='top-center' closeButton richColors duration={2000} />
		</StoreProvider>
	)
}

export default Providers
