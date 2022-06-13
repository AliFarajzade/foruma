import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaReddit } from 'react-icons/fa'
import { useSetRecoilState } from 'recoil'
import { auth } from '../../firebase/config.firebase'
import authModalStateAtom from '../../recoil/atoms/auth-modal.atom'

const PersonalHome: React.FC = () => {
    const [user] = useAuthState(auth)

    const setAuthModalState = useSetRecoilState(authModalStateAtom)
    return (
        <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            cursor="pointer"
            border="1px solid"
            borderColor="gray.300"
            position="sticky"
        >
            <Flex
                align="flex-end"
                color="white"
                p="6px 10px"
                bg="blue.500"
                height="75px"
                borderRadius="4px 4px 0px 0px"
                fontWeight={600}
                bgImage="url(/images/redditPersonalHome.png)"
                backgroundSize="cover"
            ></Flex>
            <Flex direction="column" p="12px">
                <Flex align="center" mb={2}>
                    <Icon
                        as={FaReddit}
                        fontSize={50}
                        color="brand.primary"
                        mr={2}
                    />
                    <Text fontWeight={600}>Home</Text>
                </Flex>
                <Stack spacing={3}>
                    <Text fontSize="9pt">
                        Your personal Reddit frontpage, built for you.
                    </Text>
                    <Button
                        onClick={() => {
                            if (!user)
                                setAuthModalState(prevState => ({
                                    ...prevState,
                                    open: true,
                                    view: 'logIn',
                                }))
                        }}
                        height="30px"
                    >
                        Create Post
                    </Button>
                    <Button
                        onClick={() => {
                            if (!user)
                                setAuthModalState(prevState => ({
                                    ...prevState,
                                    open: true,
                                    view: 'logIn',
                                }))
                        }}
                        variant="outline"
                        height="30px"
                    >
                        Create Community
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    )
}
export default PersonalHome
