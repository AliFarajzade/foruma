import { Box, Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import {
    collection,
    doc,
    increment,
    serverTimestamp,
    Timestamp,
    writeBatch,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { firestore } from '../../firebase/config.firebase'
import postsStateAtom from '../../recoil/atoms/post.atom'
import { TComment } from '../../types/comment.types'
import { TPost } from '../../types/post.types'
import CommentInput from './comment-input.component'

interface IProps {
    user: User | undefined | null
    selectedPost: TPost
    communityID: string
}

const Comments: React.FC<IProps> = ({ communityID, selectedPost, user }) => {
    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<TComment[]>([])
    const [fetchLoading, setFetchLoading] = useState<boolean>(false)
    const [createLoading, setCreateLoading] = useState<boolean>(false)
    const setPostState = useSetRecoilState(postsStateAtom)

    const handleDeleteComment = async (commentData: any) => {}
    const handleCreateComment = async () => {
        if (!user) return
        setCreateLoading(true)
        const batch = writeBatch(firestore)

        const newCommentRef = doc(collection(firestore, 'comments'))
        const postRef = doc(firestore, 'posts', selectedPost.ID)

        const newComment: TComment = {
            ID: newCommentRef.id,
            comment,
            communityID,
            createdAt: serverTimestamp() as Timestamp,
            creatorDisplayName: user.displayName ?? user.email!.split('@')[0],
            creatorID: user.uid,
            postID: selectedPost.ID,
            postTitle: selectedPost.title,
        }

        // 1) Create comment document on comments collection
        batch.set(newCommentRef, newComment)
        // 2) Increase the number of comments on post documents
        batch.update(postRef, { numberOfComments: increment(1) })

        try {
            await batch.commit()
            setComment('')
            setComments(prevState => [newComment, ...prevState])

            // 3) Update recoil state
            setPostState(prevState => ({
                ...prevState,
                selectedPost: {
                    ...prevState.selectedPost,
                    numberOfComments:
                        prevState.selectedPost!.numberOfComments + 1,
                } as TPost,
            }))
        } catch (error) {
            toast.error('Cannot create a new comment right now.')
            console.log(error)
        }

        setCreateLoading(false)
    }
    const getComments = async () => {}

    useEffect(() => {
        getComments()
    }, [])

    return (
        <Box bg="white" borderRadius="4px" p={2}>
            <Flex
                direction="column"
                pt={10}
                px={4}
                mb={6}
                fontSize="10pt"
                width="100%"
            >
                <CommentInput
                    user={user}
                    comment={comment}
                    setComment={setComment}
                    createLoading={createLoading}
                    handleCreateComment={handleCreateComment}
                />
            </Flex>
        </Box>
    )
}

export default Comments
