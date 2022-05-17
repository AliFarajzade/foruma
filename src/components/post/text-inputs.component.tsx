import {
    Button,
    Flex,
    Input,
    Progress,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react'

interface IProps {
    formData: {
        title: string
        description: string
    }
    handleFormChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
    handleSubmitPost: () => void
    isLoading: boolean
    progress: number | null
    isUploading: boolean
}

const TextInputs: React.FC<IProps> = ({
    formData,
    handleFormChange,
    handleSubmitPost,
    isLoading,
    isUploading,
    progress,
}) => {
    return (
        <Stack width="100%" spacing="3">
            <Input
                value={formData.title}
                onChange={handleFormChange}
                name="title"
                fontSize="11pt"
                borderRadius="5px"
                placeholder="Title"
                _placeholder={{ color: 'gray.500' }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: '#333',
                }}
            />
            <Textarea
                value={formData.description}
                onChange={handleFormChange}
                name="description"
                fontSize="11pt"
                borderRadius="5px"
                placeholder="Description (optional)"
                _placeholder={{ color: 'gray.500' }}
                height="120px"
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: '#333',
                }}
            />
            <Flex
                justify="space-between"
                gap={5}
                align="center"
                width="100%"
                py={2}
            >
                {isUploading && (
                    <Stack flexGrow={1}>
                        <Progress
                            flexGrow={1}
                            hasStripe
                            backgroundColor="gray.200"
                            value={progress!}
                            borderRadius="3px"
                        />
                        <Text fontSize="10pt">
                            Uploading media: {progress?.toFixed(0)}%
                        </Text>
                    </Stack>
                )}
                <Button
                    height="34px"
                    padding="20px 25px"
                    disabled={false}
                    onClick={handleSubmitPost}
                    isLoading={isLoading}
                    alignSelf="flex-end"
                >
                    Post
                </Button>
            </Flex>
        </Stack>
    )
}

export default TextInputs
