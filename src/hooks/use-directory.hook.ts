import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import directoryMenuStateAtom from '../recoil/atoms/directory.atom'
import { TDirectoryMenuItem } from '../types/directory.types'

const useDirectory = () => {
    const router = useRouter()

    const [directoryState, setDirectoryState] = useRecoilState(
        directoryMenuStateAtom
    )

    const toggleMenuOpen = () =>
        setDirectoryState(prevState => ({
            ...prevState,
            isOpen: !prevState.isOpen,
        }))

    const selectCommunity = (menuItem: TDirectoryMenuItem) => {
        setDirectoryState(prevState => ({
            ...prevState,
            isOpen: false,
            selectedMenuItem: menuItem,
        }))
        router.push(menuItem.link)
    }

    return { toggleMenuOpen, directoryState, selectCommunity }
}

export default useDirectory
