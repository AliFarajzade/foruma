import { Box, Button, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsPerson } from 'react-icons/bs'
import { RiCakeLine } from 'react-icons/ri'
import { useRecoilState } from 'recoil'
import { auth } from '../../firebase/config.firebase'
import communitySnippetStateAtom from '../../recoil/atoms/community.atom'
import { TCommunity } from '../../types/community.types'
import ChangeCommunityPhoto from './change-community-photo.component'

interface IProps {
    currentCommunity: TCommunity
}

const AboutCommunity: React.FC<IProps> = ({ currentCommunity }) => {
    const [communitySnippetState, setCommunitySnippetState] = useRecoilState(
        communitySnippetStateAtom
    )

    const [user] = useAuthState(auth)

    return (
        <Box position="sticky" borderRadius="4px" overflow="hidden" top="15px">
            <Flex
                justify="space-between"
                align="center"
                bg="blue.400"
                p={3}
                color="white"
            >
                <Text fontSize="10pt" fontWeight="700">
                    About Community
                </Text>
            </Flex>
            <Flex justify="space-between" align="center" bg="white">
                <Stack width="100%" p="3">
                    <Flex
                        width="100%"
                        textAlign="center"
                        p={2}
                        justify="space-between"
                        fontSize="10pt"
                        fontWeight="700"
                    >
                        <Flex direction="column" flexGrow={1}>
                            <Text>{currentCommunity.numberOfMembers}</Text>
                            <Text>
                                {currentCommunity.numberOfMembers > 1
                                    ? 'Members'
                                    : 'Member'}
                            </Text>
                        </Flex>
                        <Flex direction="column" flexGrow={1}>
                            <Text>1</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex
                        align="center"
                        width="100%"
                        p={1}
                        fontSize="10pt"
                        fontWeight="500"
                    >
                        <Icon as={RiCakeLine} fontSize="18" mr={2} />
                        <Box>
                            Created{' '}
                            <Text display="inline" fontWeight="600">
                                {moment(
                                    new Date(
                                        currentCommunity.createdAt.seconds *
                                            1000
                                    )
                                ).format('MMM DD, YYYY')}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex
                        align="center"
                        width="100%"
                        p={1}
                        fontSize="10pt"
                        fontWeight="500"
                    >
                        <Icon as={BsPerson} fontSize="18" mr={2} />
                        <Box>
                            Created By{' '}
                            <Text display="inline" fontWeight="600">
                                u/{currentCommunity.creatorName}
                            </Text>
                        </Box>
                    </Flex>
                    <Divider />

                    {user && (
                        <Link
                            href={`/r/${currentCommunity.id}/submit`}
                            prefetch={false}
                            passHref
                        >
                            <Button height="30px">Create Post</Button>
                        </Link>
                    )}
                    {user?.uid === currentCommunity.creatorID && (
                        <ChangeCommunityPhoto
                            currentCommunity={currentCommunity}
                            communitySnippetState={communitySnippetState}
                            setCommunitySnippetState={setCommunitySnippetState}
                            uid={user.uid}
                        />
                    )}
                </Stack>
            </Flex>
        </Box>
    )
}

export default AboutCommunity
