import { atom } from 'recoil'

interface IAuthModalState {
    open: boolean
    view: 'logIn' | 'resetPassword' | 'signUp'
}

const initialState: IAuthModalState = {
    open: false,
    view: 'logIn',
}

const authModalStateAtom = atom<IAuthModalState>({
    key: 'authModalState',
    default: initialState,
})

export default authModalStateAtom
