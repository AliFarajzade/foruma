import {
    Box,
    Button,
    Flex,
    Icon,
    Img,
    Skeleton,
    SkeletonCircle,
    Stack,
    Text,
} from '@chakra-ui/react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaReddit } from 'react-icons/fa'
import { firestore } from '../../firebase/config.firebase'
import useCommunityData from '../../hooks/use-community-data.hook'
import { TCommunity } from '../../types/community.types'

const Recommandation: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [communities, setCommunities] = useState<TCommunity[]>([])
    const {
        communityState,
        communityMembershipToggle,
        isLoading: membershipLoading,
    } = useCommunityData()

    const getCommunities = async () => {
        setIsLoading(true)
        const communitiesRef = collection(firestore, 'communities')
        const communitiesQuery = query(
            communitiesRef,
            orderBy('numberOfMembers', 'desc')
        )

        try {
            const communitiesSnap = await getDocs(communitiesQuery)
            const communities = communitiesSnap.empty
                ? []
                : (communitiesSnap.docs.map(docSnap => ({
                      id: docSnap.id,
                      ...docSnap.data(),
                  })) as TCommunity[])
            setCommunities(communities)
        } catch (error) {
            toast.error('Cannot get recommandations.')
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCommunities()
    }, [])

    return (
        <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            border="1px solid"
            borderColor="gray.300"
            overflow="hidden"
        >
            <Flex
                align="flex-end"
                color="white"
                p="6px 10px"
                height="70px"
                borderRadius={4}
                fontWeight={700}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url(/images/recCommsArt.png)"
            >
                Top Communities
            </Flex>
            <Flex direction="column">
                {isLoading ? (
                    <Stack mt={2} p={3} w="full">
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10" />
                            <Skeleton height="10px" width="70%" />
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10" />
                            <Skeleton height="10px" width="70%" />
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10" />
                            <Skeleton height="10px" width="70%" />
                        </Flex>
                    </Stack>
                ) : (
                    communities.map((item, index) => {
                        const isJoined = !!communityState.mySnippets.find(
                            snippet => snippet.communityID === item.id
                        )
                        return (
                            <Link key={item.id} href={`/r/${item.id}`}>
                                <Flex
                                    position="relative"
                                    align="center"
                                    fontSize="10pt"
                                    borderBottom="1px solid"
                                    borderColor="gray.200"
                                    p="10px 12px"
                                    fontWeight={600}
                                >
                                    <Flex width="80%" align="center">
                                        <Flex width="10%">
                                            <Text mr={1}>{index + 1}</Text>
                                        </Flex>
                                        <Flex align="center" width="80%">
                                            {item.imageURL ? (
                                                <Img
                                                    borderRadius="full"
                                                    boxSize="28px"
                                                    src={item.imageURL}
                                                    mr={2}
                                                />
                                            ) : (
                                                <Icon
                                                    as={FaReddit}
                                                    fontSize={30}
                                                    color="brand.100"
                                                    mr={2}
                                                />
                                            )}
                                            <span
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >{`r/${item.id}`}</span>
                                        </Flex>
                                    </Flex>
                                    <Box position="absolute" right="10px">
                                        <Button
                                            isLoading={membershipLoading}
                                            height="22px"
                                            fontSize="8pt"
                                            onClick={event => {
                                                event.stopPropagation()
                                                communityMembershipToggle(
                                                    item,
                                                    isJoined
                                                )
                                            }}
                                            variant={
                                                isJoined ? 'outline' : 'solid'
                                            }
                                        >
                                            {isJoined ? 'Joined' : 'Join'}
                                        </Button>
                                    </Box>
                                </Flex>
                            </Link>
                        )
                    })
                )}
            </Flex>
        </Flex>
    )
}

export default Recommandation
