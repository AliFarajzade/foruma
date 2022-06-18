import { Button, Flex, Img, Input, Stack, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import ReactPlayer from 'react-player/lazy'

interface IProps {
    handleSelectMedia: (event: React.ChangeEvent<HTMLInputElement>) => void
    mediaString: string
    overSizeMediaError: boolean
    handleRemoveMedia: () => void
    mediaType: 'image' | 'video' | null
    fileSizeAndTypeMessage: string
    errorMessage: string
}

const MediaSelect: React.FC<IProps> = ({
    handleSelectMedia,
    mediaString,
    overSizeMediaError,
    handleRemoveMedia,
    mediaType,
    fileSizeAndTypeMessage,
    errorMessage,
}) => {
    const fileInputElement = useRef<HTMLInputElement | null>(null)

    return (
        <Flex justify="center" align="center" width="100%">
            {mediaString ? (
                <Stack
                    maxWidth="100%"
                    alignItems="center"
                    spacing="3"
                    direction="column"
                >
                    {mediaType === 'image' ? (
                        <Img maxWidth="100%" src={mediaString} />
                    ) : (
                        <Flex maxWidth="100%">
                            <ReactPlayer
                                url={mediaString}
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
                            {errorMessage}
                        </Text>
                    )}
                    <Text
                        my="4"
                        fontSize="10pt"
                        color="gray.500"
                        textAlign="center"
                    >
                        {fileSizeAndTypeMessage}
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
