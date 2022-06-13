export type TDirectoryMenuItem = {
    name: string
    link: string
    imageURL?: string
}

export type TDirectoryMenuState = {
    isOpen: boolean
    selectedMenuItem: TDirectoryMenuItem
}
