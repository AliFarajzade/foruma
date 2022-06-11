import { Timestamp } from 'firebase/firestore'

export type TComment = {
    comment: string
    createdAt: Timestamp | { seconds: number }
    creatorID: string
    creatorDisplayName: string
    communityID: string
    postID: string
    postTitle: string
    ID: string
}
