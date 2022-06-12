import {
    Box,
    Button,
    Flex,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Text,
} from '@chakra-ui/react'
import { User } from 'firebase/auth'
import {
    collection,
    doc,
    DocumentData,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    serverTimestamp,
    startAfter,
    Timestamp,
    where,
    writeBatch,
} from 'firebase/firestore'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import { firestore } from '../../firebase/config.firebase'
import postsStateAtom from '../../recoil/atoms/post.atom'
import { TComment } from '../../types/comment.types'
import { TPost } from '../../types/post.types'
import CommentInput from './comment-input.component'
import CommentItem from './comment-item.component'

interface IProps {
    user: User | undefined | null
    selectedPost: TPost
    communityID: string
}

const LIMIT = 10

const Comments: React.FC<IProps> = ({ communityID, selectedPost, user }) => {
    const [comment, setComment] = useState<string>('')
    const [comments, setComments] = useState<TComment[]>([])
    const [fetchLoading, setFetchLoading] = useState<boolean>(true)
    const [createLoading, setCreateLoading] = useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [lastSnap, setLastSnap] =
        useState<QueryDocumentSnapshot<DocumentData> | null>(null)
    const [page, setPage] = useState<number>(1)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    const memoedSnap = useMemo(
        () => lastSnap,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page]
    )

    const setPostState = useSetRecoilState(postsStateAtom)

    const handleDeleteComment = async (commentID: string, postID: string) => {
        setDeleteLoading(true)
        const batch = writeBatch(firestore)
        const commentRef = doc(firestore, 'comments', commentID)
        const postRef = doc(firestore, 'posts', postID)

        // 1) Delete a comments document
        batch.delete(commentRef)
        // 2) Update post numberOfComments
        batch.update(postRef, { numberOfComments: increment(-1) })

        try {
            await batch.commit()

            // 3) Update recoil state
            setPostState(prevState => ({
                ...prevState,
                selectedPost: {
                    ...prevState.selectedPost,
                    numberOfComments:
                        prevState.selectedPost!.numberOfComments - 1,
                } as TPost,
            }))

            // 4) Update comments state
            setComments(prevState =>
                prevState.filter(comment => comment.ID !== commentID)
            )
        } catch (error) {
            toast.error('Cannot delete comment at the moment.')
            console.log(error)
        }
        setDeleteLoading(false)
    }
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

            newComment.createdAt = { seconds: Date.now() } as Timestamp

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
    const getComments = useCallback(async () => {
        const commentsRef = collection(firestore, 'comments')
        let commentsQuery

        if (memoedSnap)
            commentsQuery = query(
                commentsRef,
                limit(LIMIT),
                where('postID', '==', selectedPost.ID),
                orderBy('createdAt', 'desc'),
                startAfter(memoedSnap)
            )
        else
            commentsQuery = query(
                commentsRef,
                limit(LIMIT),
                where('postID', '==', selectedPost.ID),
                orderBy('createdAt', 'desc')
            )

        try {
            const commentsSnap = await getDocs(commentsQuery)

            setIsEmpty(commentsSnap.empty)

            const fetchedComments = commentsSnap.docs.map(docSnap => ({
                ID: docSnap.id,
                ...docSnap.data(),
            })) as TComment[]
            setComments(prevState => [...prevState, ...fetchedComments])
            setLastSnap(commentsSnap.docs[commentsSnap.docs.length - 1])
        } catch (error) {
            console.log(error)
        }
        setFetchLoading(false)
    }, [selectedPost.ID, memoedSnap])

    useEffect(() => {
        getComments()
    }, [getComments, page])

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
            <Stack spacing={6} px={4} py={2}>
                {fetchLoading ? (
                    <>
                        {[1, 2, 3].map(key => (
                            <Box key={key}>
                                <SkeletonCircle size="10" />
                                <SkeletonText
                                    mt="4"
                                    noOfLines={2}
                                    spacing={4}
                                />
                            </Box>
                        ))}
                    </>
                ) : comments.length === 0 ? (
                    <Flex
                        justify="center"
                        align="center"
                        borderTop="1px solid"
                        borderColor="gray.200"
                        p={20}
                    >
                        <Text fontWeight={700} opacity="0.4">
                            No Comments Yet.
                        </Text>
                    </Flex>
                ) : (
                    <>
                        {comments.map(comment => (
                            <CommentItem
                                comment={comment}
                                handleDeleteComment={handleDeleteComment}
                                loadingDelete={deleteLoading}
                                key={comment.ID}
                                userID={user?.uid}
                            />
                        ))}
                    </>
                )}
            </Stack>
            <Box mx="auto" textAlign="center" pt="10" pb="5">
                <Button
                    disabled={isEmpty || !comments.length}
                    onClick={() => setPage(prevState => prevState + 1)}
                    variant="outline"
                >
                    {isEmpty || !comments.length
                        ? 'No more comments'
                        : 'Load more comments'}
                </Button>
            </Box>
        </Box>
    )
}

export default Comments
