import { IconType } from 'react-icons'

export type TDirectoryMenuItem = {
    name: string
    link: string
    imageURL?: string
    icon: IconType
    iconColor: string
}

export type TDirectoryMenuState = {
    isOpen: boolean
    selectedMenuItem: TDirectoryMenuItem
}
