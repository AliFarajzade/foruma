import { Flex, Img } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Img src="/images/redditFace.svg" height="30px" />
                <Img
                    src="/images/redditText.svg"
                    height="46px"
                    display={{ base: 'none', md: 'unset' }}
                />
            </Flex>
        </Flex>
    )
}

export default Navbar
