import {
    Box,
    Flex,
    Icon,
    Img,
    Skeleton,
    Spinner,
    Stack,
    Text,
} from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
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
import { useSetRecoilState } from 'recoil'
import postsStateAtom from '../../recoil/atoms/post.atom'
import { TPost } from '../../types/post.types'

interface IProps {
    post: TPost
    isUserTheCreator: boolean
    userVoteValue: 1 | -1 | undefined
    handleDeletePost: (post: TPost) => Promise<boolean>
    handlePostVote: (
        post: TPost,
        voteValue: 1 | -1,
        communityID: string
    ) => Promise<void>
    votesIsLoading: boolean
    handleSelectPost?: (post: TPost) => void
}

const PostItem: React.FC<IProps> = ({
    post,
    isUserTheCreator,
    userVoteValue,
    handleDeletePost,
    handlePostVote,
    votesIsLoading,
    handleSelectPost,
}) => {
    const [isMediaLoading, setIsMediaLoading] = useState<boolean>(
        !!(post.mediaType === 'image')
    )

    const setPostsState = useSetRecoilState(postsStateAtom)

    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()

    const deletePost = async () => {
        setIsDeleting(true)
        try {
            const status = await handleDeletePost(post)

            if (status) toast('Post Deleted.', { icon: '👍️' })
            else toast.error('Could not delete the post.')
        } catch (error) {
            console.log(error)
        }
        setIsDeleting(false)
    }

    const singlePostPage = !handleSelectPost

    return (
        <Flex
            overflow="hidden"
            border="1px solid"
            borderColor={singlePostPage ? 'white' : 'gray.300'}
            borderRadius={singlePostPage ? '4px 4px 0 0' : 4}
            _hover={{ borderColor: singlePostPage ? 'none' : 'gray.500' }}
            bg="white"
        >
            {votesIsLoading ? (
                <Skeleton width="45px" />
            ) : (
                <Flex
                    direction="column"
                    align="center"
                    bg={singlePostPage ? 'none' : 'gray.100'}
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
                        color={
                            userVoteValue === 1 ? 'brand.primary' : 'gray.400'
                        }
                        fontSize={25}
                        onClick={() =>
                            handlePostVote(post, 1, post.communityID)
                        }
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
                        onClick={() =>
                            handlePostVote(post, -1, post.communityID)
                        }
                        cursor="pointer"
                    />
                </Flex>
            )}

            <Flex direction="column" width="100%">
                <Stack spacing="1" padding="10px">
                    <Stack
                        direction="row"
                        spacing="0.6"
                        align="center"
                        fontSize="9pt"
                    >
                        {/* Home page check */}
                        <Box color="gray.600">
                            Posted by{' '}
                            <Text
                                color="gray.900"
                                display="inline"
                                fontWeight="bold"
                                mr="1"
                            >
                                u/{post.creatorDisplayName}
                            </Text>
                            <Text display="inline" mr="1">
                                &#8226;
                            </Text>
                            {moment(
                                new Date(post.createdAt?.seconds! * 1000)
                            ).fromNow()}
                        </Box>
                    </Stack>

                    <Stack pb="4">
                        <Text
                            onClick={() =>
                                handleSelectPost && handleSelectPost(post)
                            }
                            cursor="pointer"
                            fontSize="13pt"
                            fontWeight="600"
                        >
                            {post.title}
                        </Text>
                        <Text fontSize="11pt">{post.description}</Text>
                    </Stack>
                    {isMediaLoading && post.mediaType === 'image' && (
                        <Skeleton width="100%" height="300px" />
                    )}
                    {post.mediaURL && (
                        <Flex
                            width="100%"
                            justify="center"
                            align="center"
                            p={2}
                            border={
                                post.mediaType === 'video' ? '1px solid' : ''
                            }
                            borderColor="gray.200"
                            borderRadius="3px"
                            onClick={() =>
                                handleSelectPost && handleSelectPost(post)
                            }
                            cursor="pointer"
                        >
                            {post.mediaType === 'video' && (
                                <ReactPlayer
                                    width="100%"
                                    url={post.mediaURL}
                                    controls={true}
                                />
                            )}
                            {post.mediaType === 'image' && (
                                <Img
                                    onLoad={() => setIsMediaLoading(false)}
                                    src={post.mediaURL}
                                    maxHeight="460px"
                                />
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
                        <Icon
                            as={BsChat}
                            mr="2"
                            onClick={() =>
                                handleSelectPost && handleSelectPost(post)
                            }
                            cursor="pointer"
                        />
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
                            onClick={() => {
                                if (isDeleting) return
                                deletePost()
                                if (singlePostPage) {
                                    setPostsState(prevState => ({
                                        ...prevState,
                                        selectedPost: null,
                                    }))
                                    router.push(`/r/${post.communityID}`)
                                }
                            }}
                        >
                            {isDeleting ? (
                                <Spinner />
                            ) : (
                                <Icon as={AiOutlineDelete} mr="2" />
                            )}
                            {!isDeleting && <Text fontSize="9pt">Delete</Text>}
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PostItem
