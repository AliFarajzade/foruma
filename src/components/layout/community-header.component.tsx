import { Box, Button, Flex, Icon, Img, Text } from '@chakra-ui/react'
import { FaReddit } from 'react-icons/fa'
import useCommunityData from '../../hooks/use-community-data.hook'
import { TCommunity } from '../../types/community.types'

interface IProps {
    communityData: TCommunity
}

const CommunityHeader: React.FC<IProps> = ({ communityData }) => {
    console.log(communityData)
    const { communityMembershipToggle, communityState, isLoading } =
        useCommunityData()
    const isJoined = !!communityState.mySnippets.find(
        ({ communityID }) => communityID === communityData.id
    )
    return (
        <Flex direction="column" width="100%" height="146px">
            <Box height="50%" bg="blue.400" />
            <Flex justify="center" bg="white" flexGrow={1}>
                <Flex width="95%" maxWidth="860px">
                    {communityData.imageURL ? (
                        <Img /* Add image here */ />
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
