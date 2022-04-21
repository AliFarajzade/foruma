import { Flex, Img } from '@chakra-ui/react'
import RightContent from '../right-content/right-content.component'
import SearchInput from '../search-input/search-input.component'

const Navbar: React.FC = () => {
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Img
                    src="/images/redditFace.svg"
                    height="30px"
                    mr={{ base: '3', md: 'unset' }}
                />
                <Img
                    src="/images/redditText.svg"
                    height="46px"
                    display={{ base: 'none', md: 'unset' }}
                />
            </Flex>
            <SearchInput />
            <RightContent />
        </Flex>
    )
}

export default Navbar
