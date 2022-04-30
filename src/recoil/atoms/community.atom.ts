import { atom } from 'recoil'
import { TCommunitySnippet } from '../../types/community.types'

interface ICommunityState {
    mySnippets: TCommunitySnippet[]
}

const initialState: ICommunityState = {
    mySnippets: [],
}

const communitySnippetState = atom<ICommunityState>({
    key: 'communitySnippetState',
    default: initialState,
})

export default communitySnippetState
