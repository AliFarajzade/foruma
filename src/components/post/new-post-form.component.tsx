import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPoll } from 'react-icons/bi'
import { BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImagesOutline } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'
import MediaSelect from './media-select.component'
import TabItem from './tab-item.component'
import TextInputs from './text-inputs.component'

const formTabs = [
    {
        title: 'Post',
        icon: IoDocumentText,
    },
    {
        title: 'Images & Video',
        icon: IoImagesOutline,
    },
    {
        title: 'Poll',
        icon: BiPoll,
    },
    {
        title: 'Talk',
        icon: BsMic,
    },
]

const NewPostForm: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title)
    const [formData, setFormData] = useState<{
        title: string
        description: string
    }>({ title: '', description: '' })
    const [media, setMedia] = useState<string>('')
    const [overSizeMediaError, setOverSizeMediaError] = useState<boolean>(false)
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null)

    const handleChangeTab = (tabTitle: string) => setSelectedTab(tabTitle)

    const handleFormChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))

    const handleSelectMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        if (!event.target.files?.[0]) return

        if (event.target.files[0].size > 5242880) {
            setOverSizeMediaError(true)
            setMediaType(null)
            return
        }

        setOverSizeMediaError(false)
        setMediaType(
            event.target.files[0].type.startsWith('video') ? 'video' : 'image'
        )

        const reader = new FileReader()

        reader.readAsDataURL(event.target.files?.[0])

        reader.onload = readerEvent => {
            if (!readerEvent.target?.result) return
            setMedia(readerEvent.target?.result as string)
        }
    }

    const handleRemoveMedia = () => {
        setMedia('')
        setMediaType(null)
    }

    const handleSubmitPost = async () => {}

    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map(tabInfo => (
                    <TabItem
                        key={uuidv4()}
                        tabInfo={tabInfo}
                        isSelected={tabInfo.title === selectedTab}
                        handleChangeTab={handleChangeTab}
                    />
                ))}
            </Flex>
            <Flex padding="20px" paddingBottom="10px">
                {selectedTab === 'Post' && (
                    <TextInputs
                        formData={formData}
                        handleFormChange={handleFormChange}
                        handleSubmitPost={handleSubmitPost}
                    />
                )}

                {selectedTab === 'Images & Video' && (
                    <MediaSelect
                        handleSelectMedia={handleSelectMedia}
                        media={media}
                        overSizeMediaError={overSizeMediaError}
                        handleRemoveMedia={handleRemoveMedia}
                        mediaType={mediaType}
                    />
                )}
            </Flex>
        </Flex>
    )
}

export default NewPostForm
