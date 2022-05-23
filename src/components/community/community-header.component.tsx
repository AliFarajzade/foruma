import { Box, Button, Flex, Icon, Img, Text } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import useCommunityData from '../../hooks/use-community-data.hook'
import { TCommunity } from '../../types/community.types'

interface IProps {
    communityData: TCommunity
}

const CommunityHeader: React.FC<IProps> = ({ communityData }) => {
    const { communityMembershipToggle, communityState, isLoading } =
        useCommunityData()
    const isJoined = !!communityState.mySnippets.find(
        ({ communityID }) => communityID === communityData.id
    )
    return (
        <Flex
            direction="column"
            width="100%"
            height={communityData.headerImgURL ? '350px' : '146px'}
        >
            {communityData.headerImgURL ? (
                <Img
                    height="80%"
                    objectFit="cover"
                    src={communityData.headerImgURL}
                />
            ) : (
                <Box height="50%" bg="blue.400" />
            )}
            <Flex
                justify="center"
                bg="white"
                height={communityData.headerImgURL ? '20%' : 'unset'}
                flexGrow={communityData.headerImgURL ? 'unset' : 1}
            >
                <Flex width="95%" maxWidth="860px">
                    {communityData.imageURL ? (
                        <Img
                            src={
                                communityState.currentCommunity?.imageURL ??
                                communityData.imageURL
                            }
                            borderRadius="full"
                            boxSize="60px"
                            alt="Community Profile Picture"
                            position="relative"
                            top="-3"
                            color="blue.500"
                            border="4px solid white"
                        />
                    ) : (
                        <Icon
                            as={FaReddit}
                            fontSize="64"
                            position="relative"
                            top={-3}
                            color="blue.400"
                            border="4px solid white"
                            borderRadius="50%"
                        />
                    )}
                    <Flex padding="10px 16px">
                        <Flex direction="column" mr="6">
                            <Text fontWeight="800" fontSize="16pt">
                                {communityData.id}
                            </Text>
                            <Text
                                fontWeight="600"
                                fontSize="10pt"
                                color="gray.400"
                            >
                                r/ {communityData.id}
                            </Text>
                        </Flex>
                        <Button
                            isLoading={isLoading}
                            variant={isJoined ? 'outline' : 'solid'}
                            height="30px"
                            px="6"
                            cursor={isJoined ? 'default' : 'pointer'}
                            onClick={() =>
                                communityMembershipToggle(
                                    communityData,
                                    isJoined
                                )
                            }
                        >
                            {isJoined ? 'Joined' : 'Join'}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CommunityHeader
