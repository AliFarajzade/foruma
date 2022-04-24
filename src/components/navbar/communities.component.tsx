import { Flex, Icon, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import CreateCommunityModal from '../modal/commiunity/create-community-modal.component'

const Communities: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <>
            <CreateCommunityModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <MenuItem
                width="100%"
                fontSize="11pt"
                _hover={{ bg: 'gray.100' }}
                onClick={() => setIsOpen(true)}
            >
                <Flex align="center">
                    <Icon as={GrAdd} mr="3" fontWeight="700" fontSize="20" />
                    Create Community
                </Flex>
            </MenuItem>
        </>
    )
}

export default Communities
