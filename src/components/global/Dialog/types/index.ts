export interface ConfirmDialogPropsTypes {
    show: boolean
    onHide: () => void
    onClick: () => void
    title?: string
    description?: string
}