import { Timestamp } from 'firebase/firestore'

export type TCommunity = {
    name: string
    createdAt: Timestamp
    creatorID: string
    numberOfMembers: number
    privacyType: string
    imageURL?: string
}
