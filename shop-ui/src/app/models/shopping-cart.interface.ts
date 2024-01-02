export interface ShoppingCartItem {
	productId: number;
	name: string;
	price: number;
	pictureUrl: string;
	brand: string;
	type: string;
	quantity: number;
}

export interface ShoppingCart {
	id: number;
	customerId: string;
	items: ShoppingCartItem[];
}