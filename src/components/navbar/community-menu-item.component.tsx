import { Flex, Icon, Img, MenuItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons/lib'

interface IProps {
    name: string
    link: string
    imageURL?: string
    icon: IconType
    iconColor: string
}

const CommunityMenuItem: React.FC<IProps> = ({
    icon,
    iconColor,
    link,
    name,
    imageURL,
}) => {
    const router = useRouter()

    return (
        <MenuItem
            width="100%"
            fontSize="11pt"
            fontWeight={700}
            _hover={{ bg: 'gray.100' }}
            onClick={() => router.push(link)}
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
