import { Flex, Icon, Img, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import {
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
} from 'react-icons/io5'
import ReactPlayer from 'react-player/lazy'
import { TPost } from '../../types/post.types'

interface IProps {
    post: TPost
    isUserTheCreator: boolean
    userVoteValue: number
}

const PostItem: React.FC<IProps> = ({
    post,
    isUserTheCreator,
    userVoteValue,
}) => {
    return (
        <Flex
            overflow="hidden"
            border="1px red"
            borderColor="gray.300"
            borderRadius={4}
            _hover={{ borderColor: 'gray.500' }}
            cursor="pointer"
            bg="white"
        >
            <Flex
                direction="column"
                align="center"
                bg="gray.100"
                p={2}
                gap="1"
                width="45px"
            >
                <Icon
                    as={
                        userVoteValue === 1
                            ? IoArrowUpCircleSharp
                            : IoArrowUpCircleOutline
                    }
                    color={userVoteValue === 1 ? 'brand.primary' : 'gray.400'}
                    fontSize={25}
                    onClick={() => {}}
                    cursor="pointer"
                />
                <Text fontSize={post.voteStatus > 999 ? '9pt' : '10pt'}>
                    {post.voteStatus}
                </Text>
                <Icon
                    as={
                        userVoteValue === -1
                            ? IoArrowDownCircleSharp
                            : IoArrowDownCircleOutline
                    }
                    color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
                    fontSize={25}
                    onClick={() => {}}
                    cursor="pointer"
                />
            </Flex>
            <Flex direction="column" width="100%">
                <Stack spacing="1" padding="10px">
                    <Stack
                        direction="row"
                        spacing="0.6"
                        align="center"
                        fontSize="9pt"
                    >
                        {/* Home page check */}
                        <Text color="gray.600">
                            Posted by u/{post.creatorDisplayName}{' '}
                            {moment(
                                new Date(post.createdAt?.seconds! * 1000)
                            ).fromNow()}
                        </Text>
                    </Stack>

                    <Stack pb="4">
                        <Text fontSize="13pt" fontWeight="600">
                            {post.title}
                        </Text>
                        <Text fontSize="11pt">{post.description}</Text>
                    </Stack>

                    {post.mediaType && (
                        <Flex
                            width="100%"
                            justify="center"
                            align="center"
                            p={2}
                            border={
                                post.mediaType === 'video' ? '1px solid' : ''
                            }
                            borderColor="gray.200"
                        >
                            {post.mediaType === 'video' && (
                                <ReactPlayer
                                    width="100%"
                                    url={post.mediaURL}
                                    controls={true}
                                />
                            )}
                            {post.mediaType === 'image' && (
                                <Img src={post.mediaURL} maxHeight="460px" />
                            )}
                        </Flex>
                    )}
                </Stack>
                <Flex ml="1" mb="0.5" color="gray.500" fontWeight="600">
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: 'gray.200' }}
                        cursor="pointer"
                    >
                        <Icon as={BsChat} mr="2" />
                        <Text fontSize="9pt">{post.numberOfComments}</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: 'gray.200' }}
                        cursor="pointer"
                    >
                        <Icon as={IoArrowRedoOutline} mr="2" />
                        <Text fontSize="9pt">Share</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: 'gray.200' }}
                        cursor="pointer"
                    >
                        <Icon as={IoBookmarkOutline} mr="2" />
                        <Text fontSize="9pt">Save</Text>
                    </Flex>
                    {isUserTheCreator && (
                        <Flex
                            align="center"
                            p="8px 10px"
                            borderRadius={4}
                            _hover={{ bg: 'gray.200' }}
                            cursor="pointer"
                        >
                            <Icon as={AiOutlineDelete} mr="2" />
                            <Text fontSize="9pt">Delete</Text>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PostItem
