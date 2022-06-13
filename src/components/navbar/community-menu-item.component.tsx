import { Flex, Img, MenuItem } from '@chakra-ui/react'
import useDirectory from '../../hooks/use-directory.hook'
import { TDirectoryMenuItem } from '../../types/directory.types'

const CommunityMenuItem: React.FC<TDirectoryMenuItem> = ({
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
                    <Img
                        src="/images/f-circle.png"
                        borderRadius="full"
                        boxSize="25px"
                        mr={2}
                    />
                )}
                {name}
            </Flex>
        </MenuItem>
    )
}

export default CommunityMenuItem
