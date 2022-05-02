import { Timestamp } from 'firebase/firestore'

export type TCommunity = {
    id: string
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

export type TCommunitySnippet = {
    communityID: string
    isModerator?: boolean
    imageURL?: string
}
