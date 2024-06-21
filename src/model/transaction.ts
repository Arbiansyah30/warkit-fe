export type PaymentMethod = "QRIS" | "CASH"

export interface TransactionModel {
    name: string,
    email: string,
    paymentMethod: PaymentMethod,
    details: TransactionDetailModel[]
}

export interface TransactionDetailModel {
    productId: string,
    quantity: number
}

export interface TransactionCreationResponse {
    token: string,
    redirect_url: string
}