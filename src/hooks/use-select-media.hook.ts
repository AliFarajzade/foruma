import { useState } from 'react'

const useSelectMedia = (
    maxSize: number = 5242880
): [
    {
        mediaFile: File | null
        overSizeMediaError: boolean
        mediaType: 'image' | null
        mediaString: string
    },
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    () => void
] => {
    const [mediaFile, setMediaFile] = useState<File | null>(null)
    const [overSizeMediaError, setOverSizeMediaError] = useState<boolean>(false)
    const [mediaType, setMediaType] = useState<'image' | null>(null)
    const [mediaString, setMediaString] = useState<string>('')

    const selectMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        if (!event.target.files?.[0]) return

        if (event.target.files[0].size > maxSize) {
            setOverSizeMediaError(true)
            setMediaType(null)
            return
        }

        setOverSizeMediaError(false)
        setMediaType('image')
        setMediaFile(event.target.files[0])

        const reader = new FileReader()

        reader.readAsDataURL(event.target.files?.[0])

        reader.onload = readerEvent => {
            if (!readerEvent.target?.result) return
            setMediaString(readerEvent.target?.result as string)
        }
    }

    const removeMedia = () => {
        setMediaString('')
        setMediaFile(null)
    }

    return [
        { mediaFile, overSizeMediaError, mediaType, mediaString },
        selectMedia,
        removeMedia,
    ]
}

export default useSelectMedia
