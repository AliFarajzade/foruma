import { Flex, Icon, Img, MenuItem } from '@chakra-ui/react'
import useDirectory from '../../hooks/use-directory.hook'
import { TDirectoryMenuItem } from '../../types/directory.types'

const CommunityMenuItem: React.FC<TDirectoryMenuItem> = ({
    icon,
    iconColor,
    link,
    name,
    imageURL,
}) => {
    const { selectCommunity } = useDirectory()

    return (
        <MenuItem
            width="100%"
            fontSize="11pt"
            fontWeight={700}
            _hover={{ bg: 'gray.100' }}
            onClick={() =>
                selectCommunity({
                    icon,
                    iconColor,
                    link,
                    name,
                    imageURL,
                })
            }
        >
            <Flex align="center">
                {imageURL ? (
                    <Img
                        src={imageURL}
                        borderRadius="full"
                        boxSize="25px"
                        mr={2}
                    />
                ) : (
                    <Icon as={icon} color={iconColor} mr={2} fontSize={25} />
                )}
                {name}
            </Flex>
        </MenuItem>
    )
}

export default CommunityMenuItem
