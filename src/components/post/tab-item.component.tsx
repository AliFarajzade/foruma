import { Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface IProps {
    tabInfo: {
        title: string
        icon: IconType
    }
    isSelected: boolean
    handleChangeTab: (tabTitle: string) => void
}

const TabItem: React.FC<IProps> = ({
    tabInfo,
    isSelected,
    handleChangeTab,
}) => {
    return (
        <Flex
            justify="center"
            align="center"
            flexGrow={1}
            padding="14px 0"
            cursor="pointer"
            _hover={{ bg: 'gray.50' }}
            color={isSelected ? 'blue.500' : 'gray.500'}
            borderWidth={isSelected ? '0 1px 2px 0' : '0 1px 1px 0'}
            borderBottomColor={isSelected ? 'blue.500' : 'gray.200'}
            onClick={() => handleChangeTab(tabInfo.title)}
        >
            <Flex align="center" height="20px" mr="2">
                <Icon as={tabInfo.icon} />
            </Flex>
            <Text fontSize="11pt" fontWeight="600">
                {tabInfo.title}
            </Text>
        </Flex>
    )
}

export default TabItem
