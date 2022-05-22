import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Img,
    Input,
    Progress,
    Stack,
    Text,
} from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import moment from 'moment'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { BsPerson } from 'react-icons/bs'
import { FaReddit } from 'react-icons/fa'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { RiCakeLine } from 'react-icons/ri'
import { useRecoilState } from 'recoil'
import { auth, firestore } from '../../firebase/config.firebase'
import useSelectMedia from '../../hooks/use-select-media.hook'
import useUploadFile from '../../hooks/use-upload-file.hook'
import communitySnippetStateAtom from '../../recoil/atoms/community.atom'
import { TCommunity } from '../../types/community.types'

interface IProps {
    currentCommunity: TCommunity
}

const AboutCommunity: React.FC<IProps> = ({ currentCommunity }) => {
    const [communitySnippetState, setCommunitySnippetState] = useRecoilState(
        communitySnippetStateAtom
    )

    const [
        { mediaFile, mediaString, overSizeMediaError },
        handleSelectImage,
        handleRemoveImage,
    ] = useSelectMedia(2097152)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [{ progress }, uploadPhoto] = useUploadFile()

    const [user] = useAuthState(auth)

    const fileInputElement = useRef<HTMLInputElement | null>(null)

    const handleUploadPhoto = async () => {
        if (!mediaFile || overSizeMediaError) return
        setIsLoading(true)
        try {
            // Upload file
            const imageURL = await uploadPhoto(
                mediaFile,
                `communities/${currentCommunity.id}/communityProfile`
            )

            // Update doc
            const communityRef = doc(
                firestore,
                'communities',
                currentCommunity.id
            )
            await setDoc(communityRef, { imageURL }, { merge: true })

            setCommunitySnippetState(prevState => ({
                ...prevState,
                currentCommunity: {
                    ...currentCommunity,
                    imageURL: imageURL as string,
                },
            }))

            handleRemoveImage()
        } catch (error) {
            toast.error('Cannot change the photo right now.')
        }
        setIsLoading(false)
    }
    return (
        <Box position="sticky" borderRadius="4px" overflow="hidden" top="15px">
            <Flex
                justify="space-between"
                align="center"
                bg="blue.400"
                p={3}
                color="white"
            >
                <Text fontSize="10pt" fontWeight="700">
                    About Community
                </Text>
                <Icon as={HiOutlineDotsHorizontal} />
            </Flex>
            <Flex justify="space-between" align="center" bg="white">
                <Stack width="100%" p="3">
                    <Flex
                        width="100%"
                        textAlign="center"
                        p={2}
                        justify="space-between"
                        fontSize="10pt"
                        fontWeight="700"
                    >
                        <Flex direction="column" flexGrow={1}>
                            <Text>{currentCommunity.numberOfMembers}</Text>
                            <Text>
                                {currentCommunity.numberOfMembers > 1
                                    ? 'Members'
                                    : 'Member'}
                            </Text>
                        </Flex>
                        <Flex direction="column" flexGrow={1}>
                            <Text>1</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex
                        align="center"
                        width="100%"
                        p={1}
                        fontSize="10pt"
                        fontWeight="500"
                    >
                        <Icon as={RiCakeLine} fontSize="18" mr={2} />
                        <Box>
                            Created{' '}
                            <Text display="inline" fontWeight="600">
                                {moment(
                                    new Date(
                                        currentCommunity.createdAt.seconds *
                                            1000
                                    )
                                ).format('MMM DD, YYYY')}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex
                        align="center"
                        width="100%"
                        p={1}
                        fontSize="10pt"
                        fontWeight="500"
                    >
                        <Icon as={BsPerson} fontSize="18" mr={2} />
                        <Box>
                            Created By{' '}
                            <Text display="inline" fontWeight="600">
                                u/{currentCommunity.creatorName}
                            </Text>
                        </Box>
                    </Flex>
                    <Divider />

                    {user && (
                        <Link
                            href={`/r/${currentCommunity.id}/submit`}
                            prefetch={false}
                            passHref
                        >
                            <Button height="30px">Create Post</Button>
                        </Link>
                    )}
                    {user?.uid === currentCommunity.creatorID && (
                        <>
                            <Divider />
                            <Stack spacing={1} fontSize="10pt">
                                <Text fontWeight="600">Admin</Text>
                                <Flex
                                    gap="4"
                                    align="center"
                                    justify="space-between"
                                >
                                    <Input
                                        type="file"
                                        hidden
                                        ref={fileInputElement}
                                        onChange={handleSelectImage}
                                        accept="image/jpg, image/jpeg, image/png"
                                    />
                                    {isLoading && (
                                        <Progress
                                            value={progress!}
                                            borderRadius="3"
                                            hasStripe
                                            flexGrow="1"
                                        />
                                    )}
                                    {!mediaFile && !isLoading && (
                                        <Text
                                            color="blue.500"
                                            cursor="pointer"
                                            _hover={{
                                                textDecoration: 'underline',
                                            }}
                                            onClick={() =>
                                                fileInputElement.current?.click()
                                            }
                                        >
                                            {currentCommunity.imageURL
                                                ? 'Change Image'
                                                : 'Select Image'}
                                        </Text>
                                    )}
                                    {mediaFile &&
                                        !overSizeMediaError &&
                                        !isLoading && (
                                            <>
                                                <Text
                                                    color="blue.500"
                                                    cursor="pointer"
                                                    _hover={{
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                    onClick={() =>
                                                        handleUploadPhoto()
                                                    }
                                                >
                                                    Set Image
                                                </Text>
                                                <Text
                                                    color="red.500"
                                                    cursor="pointer"
                                                    _hover={{
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                    onClick={() =>
                                                        handleRemoveImage()
                                                    }
                                                >
                                                    Remove Image
                                                </Text>
                                            </>
                                        )}
                                    {(currentCommunity.imageURL ||
                                        communitySnippetState.currentCommunity) &&
                                    !mediaString ? (
                                        <Img
                                            src={
                                                communitySnippetState
                                                    .currentCommunity
                                                    ?.imageURL ??
                                                currentCommunity.imageURL
                                            }
                                            borderRadius="full"
                                            boxSize="40px"
                                            alt="Community Picure"
                                            objectPosition="center"
                                        />
                                    ) : mediaString ? (
                                        <Img
                                            src={mediaString}
                                            borderRadius="full"
                                            boxSize="40px"
                                            alt="Community Picure"
                                            objectPosition="center"
                                        />
                                    ) : (
                                        <Icon
                                            as={FaReddit}
                                            fontSize="40"
                                            color="brand.primary"
                                            mr="2"
                                        />
                                    )}
                                </Flex>
                                {overSizeMediaError && (
                                    <Text
                                        pt="2"
                                        textAlign="center"
                                        color="red.500"
                                        fontWeight="700"
                                    >
                                        File should be under 2MB.
                                    </Text>
                                )}
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    )
}

export default AboutCommunity
