import { Box, Flex, Icon, MenuItem, Skeleton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import useCommunityData from '../../hooks/use-community-data.hook'
import CreateCommunityModal from '../modal/commiunity/create-community-modal.component'
import CommunityMenuItem from './community-menu-item.component'

const Communities: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {
        isLoading,
        communityState: { mySnippets },
    } = useCommunityData()
    return (
        <>
            <CreateCommunityModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <Box mt={3} mb={4}>
                <Text
                    pl={3}
                    mb={1}
                    fontSize="8pt"
                    fontWeight={500}
                    color="gray.500"
                    textTransform="uppercase"
                >
                    Moderator
                </Text>
                {isLoading
                    ? [1, 3, 4].map(key => (
                          <Skeleton key={key} height="25px" p={2} mb={2} />
                      ))
                    : mySnippets
                          .filter(snippet => !!snippet.isModerator)
                          .map(snippet => (
                              <CommunityMenuItem
                                  key={snippet.communityID}
                                  link={`/r/${snippet.communityID}`}
                                  name={`/r/${snippet.communityID}`}
                                  imageURL={snippet.imageURL}
                              />
                          ))}
            </Box>
            <Box mt={3} mb={4}>
                <Text
                    pl={3}
                    mb={1}
                    fontSize="8pt"
                    fontWeight={500}
                    color="gray.500"
                    textTransform="uppercase"
                >
                    My communities
                </Text>
                <MenuItem
                    width="100%"
                    fontSize="11pt"
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => setIsOpen(true)}
                >
                    <Flex align="center">
                        <Icon
                            as={GrAdd}
                            mr="3"
                            fontWeight="700"
                            fontSize="20"
                        />
                        Create Community
                    </Flex>
                </MenuItem>
                {isLoading
                    ? [1, 3, 4].map(key => (
                          <Skeleton key={key} height="25px" p={2} mb={2} />
                      ))
                    : mySnippets.map(snippet => (
                          <CommunityMenuItem
                              key={snippet.communityID}
                              link={`/r/${snippet.communityID}`}
                              name={snippet.communityID}
                              imageURL={snippet.imageURL}
                          />
                      ))}
            </Box>
        </>
    )
}

export default Communities
