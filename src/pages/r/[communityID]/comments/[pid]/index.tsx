import { doc, getDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import Comments from '../../../../../components/comments/comments.component'
import AboutCommunity from '../../../../../components/community/about-community.component'
import CommunityPageLayout from '../../../../../components/layout/community-layout.component'
import NotFound from '../../../../../components/not-found/not-found.component'
import PostItem from '../../../../../components/post/post-item.component'
import PostSkeleton from '../../../../../components/post/post-skeleton.component'
import SEO from '../../../../../components/SEO/seo.component'
import { auth, firestore } from '../../../../../firebase/config.firebase'
import useCommunityData from '../../../../../hooks/use-community-data.hook'
import usePosts from '../../../../../hooks/use-posts.hook'
import { TPost } from '../../../../../types/post.types'

const PostPage: NextPage = () => {
    const {
        postsState,
        setPostsState,
        handleDeletePost,
        handlePostVote,
        votesIsLoading,
    } = usePosts()

    const { communityState } = useCommunityData()

    const [loading, setLoading] = useState<boolean>(true)

    const { pid, communityID } = useRouter().query as {
        pid: string
        communityID: string
    }

    const [user] = useAuthState(auth)

    const getPost = useCallback(async () => {
        if (!pid) return
        const postRef = doc(firestore, 'posts', pid)
        try {
            const postSnap = await getDoc(postRef)
            if (!postSnap.exists())
                setPostsState(prevState => ({
                    ...prevState,
                    selectedPost: null,
                }))
            else {
                const data = {
                    ID: postSnap.id,
                    ...postSnap.data(),
                } as TPost
                setPostsState(prevState => ({
                    ...prevState,
                    selectedPost: data,
                }))
            }
        } catch (error) {
            toast.error('Cannot get the post right now.')
            setPostsState(prevState => ({
                ...prevState,
                selectedPost: null,
            }))
        }
        setLoading(false)
    }, [pid, setPostsState])

    useEffect(() => {
        if (!postsState.selectedPost) {
            getPost()
        } else setLoading(false)
    }, [pid, postsState.selectedPost, getPost])

    return loading ? (
        <CommunityPageLayout>
            <PostSkeleton />
            <PostSkeleton />
        </CommunityPageLayout>
    ) : postsState.selectedPost ? (
        <>
            <SEO
                description={postsState.selectedPost.description}
                image="/images/foruma.png"
                title={postsState.selectedPost.title}
            />
            <CommunityPageLayout>
                <>
                    <PostItem
                        post={postsState.selectedPost}
                        isUserTheCreator={
                            postsState.selectedPost?.creatorID === user?.uid
                        }
                        userVoteValue={
                            postsState.postsVotes.find(
                                ({ postID }) =>
                                    postID === postsState.selectedPost?.ID
                            )?.voteValue
                        }
                        handleDeletePost={handleDeletePost}
                        handlePostVote={handlePostVote}
                        votesIsLoading={votesIsLoading}
                    />

                    <Comments
                        communityID={communityID}
                        selectedPost={postsState.selectedPost}
                        user={user}
                    />
                </>
                <>
                    {communityState.currentCommunity && (
                        <AboutCommunity
                            currentCommunity={communityState.currentCommunity}
                        />
                    )}
                </>
            </CommunityPageLayout>
        </>
    ) : (
        <>
            <SEO
                description="Post not found"
                image="/images/foruma.png"
                title="404: Post not found"
            />
            <NotFound message="This post is either deleted or does not exists." />
        </>
    )
}

export default PostPage
