/* eslint-disable react/no-children-prop */
import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

const SearchInput = () => {
    return (
        <Flex align="center" flexGrow={1} mr="2">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.400" />}
                />
                <Input
                    placeholder="Search"
                    fontSize="10pt"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{
                        bg: 'white',
                        border: '1px solid blue.500',
                    }}
                    _focus={{
                        outline: 'none',
                        border: '1px solid blue.500',
                    }}
                    height="34px"
                    bg="gray.50"
                />
            </InputGroup>
        </Flex>
    )
}

export default SearchInput
