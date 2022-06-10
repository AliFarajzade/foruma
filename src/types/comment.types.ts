import { Timestamp } from 'firebase/firestore'

export type TComment = {
    comment: string
    createdAt: Timestamp
    creatorID: string
    creatorDisplayName: string
    communityID: string
    postID: string
    postTitle: string
    ID: string
}
