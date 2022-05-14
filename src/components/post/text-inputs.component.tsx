import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react'

interface IProps {
    formData: {
        title: string
        description: string
    }
    handleFormChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
    handleSubmitPost: () => void
}

const TextInputs: React.FC<IProps> = ({
    formData,
    handleFormChange,
    handleSubmitPost,
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
            <Flex justify="flex-end">
                <Button
                    height="34px"
                    padding="20px 25px"
                    disabled={false}
                    onClick={handleSubmitPost}
                >
                    Post
                </Button>
            </Flex>
        </Stack>
    )
}

export default TextInputs
