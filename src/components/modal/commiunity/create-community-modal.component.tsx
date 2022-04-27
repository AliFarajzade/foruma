import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Spinner,
    Text
} from '@chakra-ui/react'
import { doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import debounce from 'lodash.debounce'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'
import { auth, firestore } from '../../../firebase/config.firebase'

const allowedCharsRegex = /^[a-zA-Z]+$/

type TProps = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateCommunityModal: React.FC<TProps> = ({ isOpen, setIsOpen }) => {
    const [user] = useAuthState(auth)
    const [communityName, setCommunityName] = useState<string>('')
    const [charCount, setCharCount] = useState<number>(0)
    const [communityType, setCommunityType] = useState<string>('public')
    const [isMoreThanThree, setIsMoreThanThree] = useState<boolean | null>(null)
    const [alreadyExists, setAlreadyExists] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmtting, setIsSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const canCreate =
        isMoreThanThree && !alreadyExists && !isLoading ? true : false

    const handleChange = (eventParam: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = eventParam.target
        setError('')

        if (value.length < 3) {
            setIsMoreThanThree(false)
            setIsLoading(false)
        } else {
            setIsMoreThanThree(true)
            setIsLoading(true)
        }

        if (value.length > 22) return

        // Should cotain only ASCII without any space
        if (allowedCharsRegex.test(value) || value === '') {
            setCharCount(value.length)
            setCommunityName(value)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForExistence = useCallback(
        debounce(async () => {
            const communityRef = doc(firestore, 'communities', communityName)
            const communitySnap = await getDoc(communityRef)

            const existence = communitySnap.exists()

            if (existence) {
                setAlreadyExists(true)
                setError('This name is taken.')
            } else {
                setAlreadyExists(false)
            }
            setIsLoading(false)
        }, 1000),
        [communityName]
    )

    useEffect(() => {
        if (communityName.length >= 3) {
            checkForExistence()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [communityName])

    const handleCreateCommunity = async () => {
        const batch = writeBatch(firestore)
        const communityRef = doc(firestore, 'communities', communityName)
        const userCommunityRef = doc(
            firestore,
            `users/${user!.uid}/communitySnippets`,
            communityName
        )
        batch.set(communityRef, {
            creatorID: user?.uid,
            createdAt: serverTimestamp(),
            numberOfMembers: 1,
            privacyType: communityType,
        })

        batch.set(userCommunityRef, {
            communityID: communityName,
            isModerator: true,
        })

        try {
            setIsSubmitting(true)
            await batch.commit()
            setIsOpen(false)
            toast.success('Community created 🚀️')
        } catch (error: any) {
            toast.error('Something went wrong.')
            setError(error.message)
        }
        setIsSubmitting(false)
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display="flex"
                    flexDirection="column"
                    fontSize="20"
                    padding="3"
                >
                    Create a community
                </ModalHeader>

                <ModalCloseButton />
                <Divider />
                <Box px="3">
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        padding="10px 0"
                    >
                        <Flex position="relative" top="3" direction="column">
                            <Text fontWeight="600" fontSize="16">
                                Name
                            </Text>
                            <Text fontSize="12" color="gray.500">
                                Community names including capitalization cannot
                                be changed.
                            </Text>
                        </Flex>
                        <Text
                            position="relative"
                            top="33px"
                            left="14px"
                            color="gray.400"
                            fontSize="14pt"
                        >
                            r/
                        </Text>
                        <InputGroup>
                            <Input
                                disabled={isSubmtting}
                                focusBorderColor={
                                    isMoreThanThree === null
                                        ? 'blue.500'
                                        : isLoading
                                        ? 'blue.500'
                                        : alreadyExists || !isMoreThanThree
                                        ? 'red.400'
                                        : 'green.400'
                                }
                                value={communityName}
                                pl="35px"
                                onChange={handleChange}
                                size="md"
                            />
                            <InputRightElement
                                // eslint-disable-next-line react/no-children-prop
                                children={
                                    isLoading ? (
                                        <Spinner color="gray.500" />
                                    ) : null
                                }
                            />
                        </InputGroup>
                        <Box py="2" pl="1" fontSize="13">
                            <Box
                                display="inline-block"
                                color={charCount === 22 ? 'red' : 'gray.500'}
                            >
                                Remaining count:{' '}
                                <Text display="inline" fontWeight="700">
                                    {22 - charCount},
                                </Text>
                            </Box>
                            <Box
                                color={
                                    isMoreThanThree === false
                                        ? 'red.400'
                                        : 'gray.500'
                                }
                                display="inline"
                            >
                                {' '}
                                should be at least{' '}
                                <Text display="inline" fontWeight="700">
                                    3
                                </Text>{' '}
                                characters.
                            </Box>
                        </Box>
                        <Box
                            display={alreadyExists ? 'block' : 'none'}
                            color="red.500"
                            fontWeight="700"
                            fontSize="13"
                        >
                            {error}
                        </Box>
                        <Text mt="2" fontWeight="600" fontSize="16">
                            Community Type
                        </Text>
                        <RadioGroup
                            mt={2}
                            ml="1.5"
                            onChange={setCommunityType}
                            value={communityType}
                        >
                            <Radio
                                spacing="2"
                                isFullWidth={true}
                                mb="1"
                                value="public"
                            >
                                <Flex align="center">
                                    <Icon mr="1" as={BsFillPersonFill} />
                                    Public
                                </Flex>
                            </Radio>
                            <Text
                                ml="2.5"
                                mb="1.5"
                                fontSize="13"
                                color="gray.500"
                            >
                                Anybody can view this community plus post and
                                comment on it.
                            </Text>
                            <Radio
                                spacing="2"
                                isFullWidth={true}
                                mb="1"
                                value="restricted"
                            >
                                <Flex align="center">
                                    <Icon mr="1" as={BsFillEyeFill} />
                                    Restricted
                                </Flex>
                            </Radio>
                            <Text
                                ml="2.5"
                                mb="1.5"
                                fontSize="13"
                                color="gray.500"
                            >
                                Anybody can view this community but only certain
                                users can post.
                            </Text>
                            <Radio
                                spacing="2"
                                isFullWidth={true}
                                mb="1"
                                value="private"
                            >
                                <Flex align="center">
                                    <Icon mr="1" as={HiLockClosed} />
                                    Private
                                </Flex>
                            </Radio>
                            <Text
                                ml="2.5"
                                mb="1.5"
                                fontSize="13"
                                color="gray.500"
                            >
                                Anybody approved users can view this community
                                and post on it.
                            </Text>
                        </RadioGroup>
                    </ModalBody>
                </Box>

                <ModalFooter bg="gray.100">
                    <Button
                        isLoading={isSubmtting}
                        onClick={handleCreateCommunity}
                        disabled={!canCreate}
                        variant="solid"
                    >
                        Create Community
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateCommunityModal
