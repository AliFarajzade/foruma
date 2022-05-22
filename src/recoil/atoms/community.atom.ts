import { atom } from 'recoil'
import { TCommunity, TCommunitySnippet } from '../../types/community.types'

export interface ICommunityState {
    mySnippets: TCommunitySnippet[]
    currentCommunity?: TCommunity
}

const initialState: ICommunityState = {
    mySnippets: [],
}

const communitySnippetStateAtom = atom<ICommunityState>({
    key: 'communitySnippetState',
    default: initialState,
})

export default communitySnippetStateAtom
