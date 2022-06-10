import { Box, Flex } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { TPost } from '../../types/post.types'
import CommentInput from './comment-input.component'

interface IProps {
    user: User | undefined | null
    selectedPost: TPost
    communityID: string
}

const Comments: React.FC<IProps> = ({ communityID, selectedPost, user }) => {
    const [comment, setComment] = useState<string>('')
    const [fetchLoading, setFetchLoading] = useState<boolean>(false)
    const [createLoading, setCreateLoading] = useState<boolean>(false)

    const handleDeleteComment = async (commentData: any) => {}
    const handleCreateComment = async (commentID: string) => {}
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
