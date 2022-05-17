import { useRecoilState } from 'recoil'
import postsStateAtom from '../recoil/atoms/post.atom'

const usePosts = () => {
    const [postsState, setPostsState] = useRecoilState(postsStateAtom)

    const handlePostVote = async () => {}
    const handleDeletePost = async () => {}
    const handleSelectPost = () => {}

    return {
        postsState,
        setPostsState,
    }
}

export default usePosts
