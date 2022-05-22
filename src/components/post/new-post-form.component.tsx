import { Flex } from '@chakra-ui/react'
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
    Timestamp,
} from 'firebase/firestore'
import type { StorageError } from 'firebase/storage'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { BiPoll } from 'react-icons/bi'
import { BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImagesOutline } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'
import { auth, firestore } from '../../firebase/config.firebase'
import useSelectMedia from '../../hooks/use-select-media.hook'
import useUploadFile from '../../hooks/use-upload-file.hook'
import { TPost } from '../../types/post.types'
import MediaSelect from './media-select.component'
import TabItem from './tab-item.component'
import TextInputs from './text-inputs.component'

const formTabs = [
    {
        title: 'Post',
        icon: IoDocumentText,
    },
    {
        title: 'Image & Video',
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

    const [
        { mediaFile, mediaString, overSizeMediaError, mediaType },
        handleSelectMedia,
        handleRemoveMedia,
    ] = useSelectMedia()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | StorageError>(null)

    const router = useRouter()

    const [{ isUploading, progress }, uploadFile] = useUploadFile()

    const [user] = useAuthState(auth)

    const handleChangeTab = (tabTitle: string) => setSelectedTab(tabTitle)

    const handleFormChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
        setFormData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))

    const handleSubmitPost = async () => {
        if (!user) return

        setIsLoading(true)
        setError(null)

        const newPost: Omit<TPost, 'ID'> = {
            communityID: router.query.communityID as string,
            createdAt: serverTimestamp() as Timestamp,
            creatorID: user.uid,
            creatorDisplayName: user.displayName ?? user.email!.split('@')[0],
            description: formData.description,
            title: formData.title,
            numberOfComments: 0,
            voteStatus: 0,
        }

        const postRef = collection(firestore, `posts`)

        try {
            const postDocRef = await addDoc(postRef, newPost)

            if (mediaFile && !overSizeMediaError) {
                const mediaURL = await uploadFile(
                    mediaFile,
                    `posts/${router.query.communityID}/${postDocRef.id}`
                )
                const postRef = doc(firestore, 'posts', postDocRef.id)
                await setDoc(postRef, { mediaURL, mediaType }, { merge: true })
            }

            toast.success('Posted!')
            router.push(`/r/${router.query.communityID}`)
        } catch (error) {
            setError(error as StorageError)
            toast.error('Could not create a post.')
            console.log(error)
        }

        setIsLoading(false)
    }

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
                        isLoading={isLoading}
                        isUploading={isUploading}
                        progress={progress}
                    />
                )}

                {selectedTab === 'Image & Video' && (
                    <MediaSelect
                        handleSelectMedia={handleSelectMedia}
                        mediaString={mediaString}
                        overSizeMediaError={overSizeMediaError}
                        handleRemoveMedia={handleRemoveMedia}
                        mediaType={mediaType}
                    />
                )}
                <Flex py={4}></Flex>
            </Flex>
        </Flex>
    )
}

export default NewPostForm
