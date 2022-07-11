import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../firebase/config.firebase'

const useUploadFile = (): [
    { progress: number | null; isUploading: boolean },
    (media: File, refString: string) => Promise<unknown>
] => {
    const [progress, setProgress] = useState<number | null>(null)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const uploadFile = async (media: File, refString: string) =>
        new Promise((res, rej) => {
            setIsUploading(true)
            const storageRef = ref(storage, refString)

            const uploadTask = uploadBytesResumable(storageRef, media)

            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setProgress(progress)
                },
                storageError => {
                    if (storageError) {
                        setIsUploading(false)
                        rej(storageError)
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        downloadURL => {
                            setIsUploading(false)
                            setProgress(null)
                            res(downloadURL)
                        }
                    )
                }
            )
        })

    return [{ progress, isUploading }, uploadFile]
}

export default useUploadFile
