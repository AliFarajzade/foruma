import { atom } from 'recoil'
import { TCommunity, TCommunitySnippet } from '../../types/community.types'

export interface ICommunityState {
    mySnippets: TCommunitySnippet[]
    currentCommunity?: TCommunity
    fetchedSnippets: boolean
}

const initialState: ICommunityState = {
    mySnippets: [],
    fetchedSnippets: false,
}

const communitySnippetStateAtom = atom<ICommunityState>({
    key: 'communitySnippetState',
    default: initialState,
})

export default communitySnippetStateAtom
