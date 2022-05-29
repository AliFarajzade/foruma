import {
    Divider,
    Flex,
    Icon,
    Img,
    Input,
    Progress,
    Stack,
    Text,
} from '@chakra-ui/react'
import { doc, writeBatch } from 'firebase/firestore'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaReddit } from 'react-icons/fa'
import { SetterOrUpdater } from 'recoil'
import { firestore } from '../../firebase/config.firebase'
import useSelectMedia from '../../hooks/use-select-media.hook'
import useUploadFile from '../../hooks/use-upload-file.hook'
import { ICommunityState } from '../../recoil/atoms/community.atom'
import { TCommunity } from '../../types/community.types'

interface IProps {
    currentCommunity: TCommunity
    communitySnippetState: ICommunityState
    setCommunitySnippetState: SetterOrUpdater<ICommunityState>
    uid: string
}

const ChangeCommunityPhoto: React.FC<IProps> = ({
    currentCommunity,
    communitySnippetState,
    setCommunitySnippetState,
    uid,
}) => {
    const fileInputElement = useRef<HTMLInputElement | null>(null)

    const [
        { mediaFile, mediaString, overSizeMediaError },
        handleSelectImage,
        handleRemoveImage,
    ] = useSelectMedia(2097152)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [{ progress }, uploadPhoto] = useUploadFile()

    const handleUploadPhoto = async () => {
        if (!mediaFile || overSizeMediaError) return
        setIsLoading(true)
        const batch = writeBatch(firestore)
        const communityRef = doc(firestore, 'communities', currentCommunity.id)
        const communitySnippetRef = doc(
            firestore,
            `users/${uid}/communitySnippets`,
            currentCommunity.id
        )
        try {
            // Upload file
            const imageURL = await uploadPhoto(
                mediaFile,
                `communities/${currentCommunity.id}/communityProfile`
            )

            // Update docs
            batch.update(communityRef, { imageURL })
            batch.update(communitySnippetRef, { imageURL })

            await batch.commit()

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
        <>
            <Divider />
            <Stack spacing={1} fontSize="10pt">
                <Text fontWeight="600">Admin</Text>
                <Flex gap="4" align="center" justify="space-between">
                    <Input
                        type="file"
                        hidden
                        ref={fileInputElement}
                        onChange={handleSelectImage}
                        accept="image/jpg, image/jpeg, image/png"
                    />
                    {isLoading && (
                        <Progress
                            value={progress || 100}
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
                            onClick={() => fileInputElement.current?.click()}
                        >
                            {currentCommunity.imageURL
                                ? 'Change Image'
                                : 'Select Image'}
                        </Text>
                    )}
                    {mediaFile && !overSizeMediaError && !isLoading && (
                        <>
                            <Text
                                color="blue.500"
                                cursor="pointer"
                                _hover={{
                                    textDecoration: 'underline',
                                }}
                                onClick={() => handleUploadPhoto()}
                            >
                                Set Image
                            </Text>
                            <Text
                                color="red.500"
                                cursor="pointer"
                                _hover={{
                                    textDecoration: 'underline',
                                }}
                                onClick={() => handleRemoveImage()}
                            >
                                Remove Image
                            </Text>
                        </>
                    )}
                    {(currentCommunity.imageURL ||
                        communitySnippetState.currentCommunity?.imageURL) &&
                    !mediaString ? (
                        <Img
                            src={
                                communitySnippetState.currentCommunity
                                    ?.imageURL ?? currentCommunity.imageURL
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
    )
}

export default ChangeCommunityPhoto
