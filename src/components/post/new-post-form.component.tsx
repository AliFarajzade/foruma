import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPoll } from 'react-icons/bi'
import { BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImagesOutline } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'
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

    const handleChangeTab = (tabTitle: string) => setSelectedTab(tabTitle)

    const handleFormChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))

    const handleSelectMedia = () => {}

    const handleSubmitPost = async () => {}

    console.log(formData)

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
            </Flex>
        </Flex>
    )
}

export default NewPostForm
