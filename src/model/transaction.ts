import { ProductModel } from "./product"

export type PaymentMethod = "QRIS" | "CASH"

export interface TransactionModel {
    id?: string,
    name: string,
    email: string,
    paymentMethod: PaymentMethod,
    details?: TransactionDetailModel[],
    status?: string,
    totalQuantity?: number,
    totalAmount?: number,
    transactionDetails?: TransactionDetailModel[]
}

export interface TransactionDetailModel {
    productId: string,
    quantity: number,
    product?: ProductModel
}

export interface TransactionCreationResponse {
    token: string,
    redirect_url: string
}