import { Flex, Icon, Img, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsLink45Deg } from 'react-icons/bs'
import { IoImageOutline } from 'react-icons/io5'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { auth } from '../../firebase/config.firebase'
import authModalStateAtom from '../../recoil/atoms/auth-modal.atom'
import directoryMenuStateAtom from '../../recoil/atoms/directory.atom'

const CreatePostLink: React.FC = () => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const setAuthModalState = useSetRecoilState(authModalStateAtom)
    const [directoryState, setDirectoryState] = useRecoilState(
        directoryMenuStateAtom
    )

    const handleChangeRoute = () => {
        if (!user) {
            setAuthModalState(prevState => ({
                ...prevState,
                open: true,
                view: 'logIn',
            }))
        } else {
            if (
                !directoryState.selectedMenuItem ||
                directoryState.selectedMenuItem.name === 'Home'
            )
                setDirectoryState(prevState => ({
                    ...prevState,
                    isOpen: true,
                }))
            else {
                const { communityID } = router.query
                router.push(`/r/${communityID}/submit`)
            }
        }
    }
    return (
        <Flex
            justify="space-evenly"
            align="center"
            bg="white"
            height="56px"
            borderRadius={4}
            border="1px solid"
            borderColor="gray.300"
            p={2}
            mb={4}
        >
            <Img
                src={
                    directoryState.selectedMenuItem.imageURL ??
                    '/images/f-circle.png'
                }
                boxSize="34px"
                mr={4}
                borderRadius="full"
            />
            <Input
                placeholder="Create Post"
                fontSize="10pt"
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500',
                }}
                bg="gray.50"
                borderColor="gray.200"
                height="36px"
                borderRadius={4}
                mr={4}
                onClick={handleChangeRoute}
            />
            <Icon
                as={IoImageOutline}
                fontSize={24}
                mr={4}
                color="gray.400"
                cursor="pointer"
            />
            <Icon
                as={BsLink45Deg}
                fontSize={24}
                color="gray.400"
                cursor="pointer"
            />
        </Flex>
    )
}
export default CreatePostLink
