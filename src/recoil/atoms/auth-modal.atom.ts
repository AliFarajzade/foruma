import { atom } from 'recoil'

export interface IAuthModalState {
    open: boolean
    view: 'logIn' | 'resetPassword' | 'signUp'
}

const initialState: IAuthModalState = {
    open: false,
    view: 'logIn',
}

const authModalState = atom<IAuthModalState>({
    key: 'authModalState',
    default: initialState,
})

export default authModalState
