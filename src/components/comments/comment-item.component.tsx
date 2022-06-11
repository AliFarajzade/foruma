import { Box, Flex, Icon, Spinner, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import { FaReddit } from 'react-icons/fa'
import {
    IoArrowDownCircleOutline,
    IoArrowUpCircleOutline,
} from 'react-icons/io5'
import { TComment } from '../../types/comment.types'

interface IProps {
    comment: TComment
    handleDeleteComment: (commentID: string, postID: string) => void
    loadingDelete: boolean
    userID: string | undefined
}

const CommentItem: React.FC<IProps> = ({
    comment,
    userID,
    handleDeleteComment,
    loadingDelete,
}) => {
    return (
        <Flex>
            <Box mr={2}>
                <Icon as={FaReddit} fontSize={35} color="gray.300" />
            </Box>
            <Stack spacing={1}>
                <Stack direction="row" align="center" fontSize="pt">
                    <Text fontSize="12pt" fontWeight={700}>
                        {comment.creatorDisplayName}
                    </Text>
                    <Text fontSize="10pt" color="gray.600">
                        {moment(
                            new Date(comment.createdAt.seconds * 1000)
                        ).fromNow()}
                    </Text>
                </Stack>
                <Text fontSize="11pt">{comment.comment}</Text>
                <Stack
                    pt={2}
                    direction="row"
                    align="center"
                    cursor="pointer"
                    color="gray.500"
                >
                    <Icon fontSize={22} as={IoArrowUpCircleOutline} />
                    <Icon fontSize={22} as={IoArrowDownCircleOutline} />
                    {userID === comment.creatorID && (
                        <>
                            <Text
                                fontSize="10pt"
                                _hover={{ color: 'blue.500' }}
                            >
                                Edit
                            </Text>
                            <Text
                                fontSize="10pt"
                                _hover={{ color: 'blue.500' }}
                                onClick={() => {
                                    if (loadingDelete) return
                                    handleDeleteComment(
                                        comment.ID,
                                        comment.postID
                                    )
                                }}
                            >
                                Delete
                            </Text>
                            {loadingDelete && <Spinner />}
                        </>
                    )}
                </Stack>
            </Stack>
        </Flex>
    )
}

export default CommentItem
