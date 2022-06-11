import { TiHome } from 'react-icons/ti'
import { atom } from 'recoil'
import {
    TDirectoryMenuItem,
    TDirectoryMenuState,
} from '../../types/directory.types'

const defaultMenuItem: TDirectoryMenuItem = {
    name: 'Home',
    link: '/',
    icon: TiHome,
    iconColor: 'black',
}

const INITIAL_STATE: TDirectoryMenuState = {
    isOpen: false,
    selectedMenuItem: defaultMenuItem,
}

const directoryMenuStateAtom = atom<TDirectoryMenuState>({
    default: INITIAL_STATE,
    key: 'directoryMenuState',
})

export default directoryMenuStateAtom
