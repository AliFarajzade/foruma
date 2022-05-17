import { atom } from 'recoil'
import { TCommunitySnippet } from '../../types/community.types'

interface ICommunityState {
    mySnippets: TCommunitySnippet[]
}

const initialState: ICommunityState = {
    mySnippets: [],
}

const communitySnippetStateAtom = atom<ICommunityState>({
    key: 'communitySnippetState',
    default: initialState,
})

export default communitySnippetStateAtom
