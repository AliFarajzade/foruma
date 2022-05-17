import { atom } from 'recoil'
import { TPost } from '../../types/post.types'

interface IPostState {
    selectedPost: null | TPost
    posts: TPost[]
    // postVotes
}

const INITIAL_STATE: IPostState = {
    selectedPost: null,
    posts: [],
}

const postState = atom<IPostState>({
    key: 'postState',
    default: INITIAL_STATE,
})

export default postState
