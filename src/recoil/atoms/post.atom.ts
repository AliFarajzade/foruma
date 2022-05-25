import { atom } from 'recoil'
import { IPostVote, TPost } from '../../types/post.types'

interface IPostState {
    selectedPost: null | TPost
    posts: TPost[]
    postsVote: IPostVote[]
}

const INITIAL_STATE: IPostState = {
    selectedPost: null,
    posts: [],
    postsVote: [],
}

const postsStateAtom = atom<IPostState>({
    key: 'postState',
    default: INITIAL_STATE,
})

export default postsStateAtom
