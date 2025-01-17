// all products
export type TProductsParams = {
	limit?: number
	skip?: number
	select?: string
	sortBy?: string
	order?: 'asc' | 'desc'
}
export type TProduct = {
	id: number
	title: string
	description: string
	category: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	tags: string[]
	brand: string
	sku: string
	weight: number
	dimensions: {
		width: number
		height: number
		depth: number
	}
	warrantyInformation: string
	shippingInformation: string
	availabilityStatus: string
	reviews: {
		rating: number
		comment: string
		date: string
		reviewerName: string
		reviewerEmail: string
	}[]
	returnPolicy: string
	minimumOrderQuantity: number
	meta: {
		createdAt: string
		updatedAt: string
		barcode: string
		qrCode: string
	}
	thumbnail: string
	images: string[]
}
export type TProductsResponse = {
	products: TProduct[]
	total: number
	skip: number
	limit: number
}

// all product categories
export type TProductCategory = {
	slug: string
	name: string
	url: string
}
