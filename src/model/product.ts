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

export interface ProductBodyModel {
    name: string | undefined
    price: number | undefined
    image: File | string | undefined
    categoryId: string
    stock: number | undefined
}

export interface ProductModelWithQty extends ProductModel {
    qty?: number
}