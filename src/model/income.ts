export interface IncomeItem {
    id?: string,
    nominal: number,
    transaction?: {
        id: string,
        name: string,
        paymentMethod: "QRIS" | "CASH",
        settlementTime: string,
        totalAmount: number,
        totalQuantity: number
    },
    createdAt: Date
}

export interface IncomeModel {

    incomes: IncomeItem[],
    totalIncome: number
}