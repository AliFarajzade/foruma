import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Text,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'

const allowedCharsRegex = /^[a-zA-Z]+$/

type TProps = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CreateCommunityModal: React.FC<TProps> = ({ isOpen, setIsOpen }) => {
    const [communityName, setCommunityName] = useState<string>('')
    const [charCount, setCharCount] = useState<number>(0)
    const [communityType, setCommunityType] = useState<string>('public')

    const handleChange = (eventParam: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = eventParam.target

        if (value.length > 22) return

        if (allowedCharsRegex.test(value) || value === '') {
            setCharCount(value.length)
            setCommunityName(value)
        }
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
                        <Input
                            value={communityName}
                            pl="35px"
                            onChange={handleChange}
                            size="md"
                        />
                        <Text
                            py="2"
                            pl="1"
                            color={charCount === 22 ? 'red' : 'gray.500'}
                            fontSize="13"
                        >
                            Remaining count: {22 - charCount}
                        </Text>
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
                                Anybody can view this community but only
                                approved users can post.
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
                    <Button variant="solid">Create Community</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateCommunityModal
