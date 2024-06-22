export interface ICart {
    id: string,
    qty: number
}

export const CartMapper = () => {
    const cart = localStorage.getItem("cart") || "[]"
    return JSON.parse(cart as string).map((item: ICart) => ({ productId: item.id, quantity: item.qty }))
}