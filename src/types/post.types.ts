import type { Timestamp } from 'firebase/firestore'

export type TPost = {
    ID: string
    communityID: string
    creatorID: string
    creatorDisplayName: string
    title: string
    description: string
    numberOfComments: number
    voteStatus: number
    mediaURL?: string
    mediaType?: 'image' | 'video'
    communityImageURL?: string
    createdAt: Timestamp
}

export type TPostVote = {
    ID: string
    postID: string
    communityID: string
    voteValue: -1 | 1
}
