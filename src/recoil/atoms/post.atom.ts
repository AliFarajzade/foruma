import { atom } from 'recoil'
import { TPost, TPostVote } from '../../types/post.types'

interface IPostState {
    selectedPost: null | TPost
    posts: TPost[]
    postsVotes: TPostVote[]
}

const INITIAL_STATE: IPostState = {
    selectedPost: null,
    posts: [],
    postsVotes: [],
}

const postsStateAtom = atom<IPostState>({
    key: 'postState',
    default: INITIAL_STATE,
})

export default postsStateAtom
