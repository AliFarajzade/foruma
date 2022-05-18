import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { firestore, storage } from '../firebase/config.firebase'
import postsStateAtom from '../recoil/atoms/post.atom'
import { TPost } from '../types/post.types'

const usePosts = () => {
    const [postsState, setPostsState] = useRecoilState(postsStateAtom)

    const handlePostVote = async () => {}
    const handleDeletePost = async (post: TPost): Promise<boolean> => {
        const postRef = doc(firestore, 'posts', post.ID)
        try {
            // 1) Remove document from firestore
            await deleteDoc(postRef)

            // 2) If there is a media, delete it from storage
            if (post.mediaURL) {
                const mediaRef = ref(
                    storage,
                    `posts/${post.communityID}/${post.ID}`
                )
                await deleteObject(mediaRef)
            }

            // 3) Remove post from recoil state
            setPostsState(prevState => ({
                ...prevState,
                posts: prevState.posts.filter(({ ID }) => ID !== post.ID),
            }))

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    const handleSelectPost = () => {}

    return {
        postsState,
        setPostsState,
        handleDeletePost,
    }
}

export default usePosts
