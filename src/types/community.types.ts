import { Timestamp } from 'firebase/firestore'

export type TCommunity = {
    id: string
    name: string
    createdAt:
        | Timestamp
        | {
              nanoseconds: number
              seconds: number
          }
    creatorID: string
    numberOfMembers: number
    privacyType: string
    imageURL?: string
}
