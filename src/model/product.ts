export interface CategoryModel {
    id: string
    name: string
}

export interface ProductModel {
    id?: string,
    name?: string,
    price?: number,
    image?: string,
    category?: CategoryModel,
    stock?: number
}

export interface ProductModelWithQty extends ProductModel {
    qty?: number
}