import { deleteDoc, doc, increment, writeBatch } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { auth, firestore, storage } from '../firebase/config.firebase'
import postsStateAtom from '../recoil/atoms/post.atom'
import { TPost, TPostVote } from '../types/post.types'

const usePosts = () => {
    const [postsState, setPostsState] = useRecoilState(postsStateAtom)
    const [user] = useAuthState(auth)

    const handlePostVote = async (
        post: TPost,
        voteValue: 1 | -1,
        communityID: string
    ) => {
        if (!user) return

        const existingVote = postsState.postsVotes.find(
            ({ ID }) => ID === post.ID
        )

        const batch = writeBatch(firestore)
        let updatedPost = { ...post }
        let updatedPosts = [...postsState.posts]
        let updatedPostsVotes = [...postsState.postsVotes]

        const postIndex = updatedPosts.findIndex(({ ID }) => ID === post.ID)

        const postRef = doc(firestore, 'posts', post.ID)
        const postVoteRef = doc(
            firestore,
            `users/${user.uid}/postsVotes`,
            post.ID
        )

        const newPostVote: TPostVote = {
            ID: postVoteRef.id,
            communityID,
            postID: post.ID,
            voteValue,
        }

        let finalVote: number = 0

        // Havent vote yet.
        if (!existingVote) {
            finalVote = voteValue

            updatedPostsVotes = [...updatedPostsVotes, newPostVote]

            // Increament or decreament voteStatus.
            batch.update(postRef, { voteStatus: increment(finalVote) })

            // Create new vote document.
            batch.set(postVoteRef, newPostVote)
        } else {
            updatedPostsVotes = updatedPostsVotes.filter(
                ({ postID }) => postID !== post.ID
            )

            // Removing the vote.
            if (existingVote.voteValue === voteValue) {
                finalVote = -voteValue

                // Delete vote document.
                batch.delete(postVoteRef)
            }

            // Filipping the vote.
            else {
                finalVote = voteValue * 2

                updatedPostsVotes = [...updatedPostsVotes, newPostVote]

                // Update vote document.
                batch.update(postVoteRef, { voteValue: increment(voteValue) })
            }
            // Increament or decreament voteStatus.

            batch.update(postRef, { voteStatus: increment(finalVote) })
        }

        updatedPost = {
            ...updatedPost,
            voteStatus: updatedPost.voteStatus + finalVote,
        }
        updatedPosts[postIndex] = { ...updatedPost }

        // Update state.
        setPostsState(prevState => ({
            ...prevState,
            posts: updatedPosts,
            postsVotes: updatedPostsVotes,
        }))

        try {
            // Batch commit
            batch.commit()
        } catch (error) {
            console.log(error)
        }
    }

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
        handlePostVote,
    }
}

export default usePosts
