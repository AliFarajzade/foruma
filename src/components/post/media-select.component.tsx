import { Button, Flex, Img, Input, Stack, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import ReactPlayer from 'react-player/lazy'

interface IProps {
    handleSelectMedia: (event: React.ChangeEvent<HTMLInputElement>) => void
    media: string
    overSizeMediaError: boolean
    handleRemoveMedia: () => void
    mediaType: 'image' | 'video' | null
}

const MediaSelect: React.FC<IProps> = ({
    handleSelectMedia,
    media,
    overSizeMediaError,
    handleRemoveMedia,
    mediaType,
}) => {
    const fileInputElement = useRef<HTMLInputElement | null>(null)
    console.log(overSizeMediaError)
    console.log(mediaType)

    return (
        <Flex justify="center" align="center" width="100%">
            {media ? (
                <Stack
                    maxWidth="100%"
                    alignItems="center"
                    spacing="3"
                    direction="column"
                >
                    {mediaType === 'image' ? (
                        <Img maxWidth="100%" src={media} />
                    ) : (
                        <Flex maxWidth="100%">
                            <ReactPlayer
                                url={media}
                                controls={true}
                                playing={true}
                            />
                        </Flex>
                    )}
                    <Button
                        px="20px"
                        bg="red.500"
                        _hover={{ bg: 'gray.300', color: '#333' }}
                        width="fit-content"
                        onClick={handleRemoveMedia}
                    >
                        Remove
                    </Button>
                </Stack>
            ) : (
                <Flex
                    justify="center"
                    align="center"
                    flexDirection="column"
                    padding={20}
                    border="1px dashed"
                    borderColor="gray.300"
                    width="100%"
                    borderRadius="4"
                >
                    <Button
                        variant="outline"
                        onClick={() => fileInputElement?.current?.click()}
                    >
                        Select a file
                    </Button>
                    {overSizeMediaError && (
                        <Text
                            my="4"
                            fontWeight="700"
                            fontSize="11pt"
                            color="red.500"
                        >
                            File is larger than 5MB. Select another file.
                        </Text>
                    )}
                    <Text my="4" fontSize="10pt" color="gray.500">
                        JPEG, JPG, PNG and mp4 files under 5MB.
                    </Text>
                    <Input
                        hidden
                        ref={fileInputElement}
                        type="file"
                        onChange={handleSelectMedia}
                        accept="image/jpg, image/jpeg, image/png, video/mp4"
                    />
                </Flex>
            )}
        </Flex>
    )
}

export default MediaSelect
