/* eslint-disable react/no-children-prop */
import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { User } from 'firebase/auth'

type TProps = {
    user: User | undefined | null
}

const SearchInput: React.FC<TProps> = ({ user }) => {
    return (
        <Flex
            align="center"
            maxWidth={user ? 'auto' : '500px'}
            flexGrow={1}
            mr={{ base: '0', sm: '2' }}
        >
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.400" mb={1.5} />}
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
