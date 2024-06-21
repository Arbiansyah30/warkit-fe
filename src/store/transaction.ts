import { atom } from "jotai";

export const transactionAtom = atom({
    name: "",
    email: "",
    details: [
        {
            productId: "",
            quantity: 0
        }
    ],
    selected: [""]
})