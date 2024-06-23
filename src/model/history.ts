export interface HistoryModel {
    createdAt: Date
    id: string
    status: "PAID" | "UNPAID"
    transactionId: string
    updatedAt: Date
}