import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import AboutCommunity from '../../../components/community/about-community.component'
import CommunityPageLayout from '../../../components/layout/community-layout.component'
import NewPostForm from '../../../components/post/new-post-form.component'
import PostSkeleton from '../../../components/post/post-skeleton.component'
import useCommunityData from '../../../hooks/use-community-data.hook'

const SubmitPage: NextPage = () => {
    const { communityState } = useCommunityData()
    return (
        <CommunityPageLayout>
            <>
                <Box bg="white" padding="15px" fontWeight="400">
                    Create a new post
                </Box>
                <NewPostForm
                    communityImageURL={
                        communityState.currentCommunity?.imageURL
                    }
                />
            </>

            <>
                {communityState.currentCommunity ? (
                    <AboutCommunity
                        currentCommunity={communityState.currentCommunity}
                    />
                ) : (
                    <PostSkeleton />
                )}
            </>
        </CommunityPageLayout>
    )
}

export default SubmitPage
