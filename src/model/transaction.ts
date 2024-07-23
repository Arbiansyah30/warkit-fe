import { ProductModel } from "./product"

export type PaymentMethod = "QRIS" | "CASH"

export interface TransactionModel {
    id?: string,
    name: string,
    email: string,
    paymentMethod: PaymentMethod,
    details?: TransactionDetailModel[],
    status?: 'PAID' | 'UNPAID' | 'CANCEL',
    totalQuantity?: number,
    totalAmount?: number,
    totalPaid?: number,
    totalReturn?: number,
    serialNumber?: string,
    payMoney?: number,
    transactionDetails?: TransactionDetailModel[],
    createdAt?: Date
}

export interface PaymentModel {
    totalPaid: number,
}

export interface PrintPaymentModel {
    id: string,
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