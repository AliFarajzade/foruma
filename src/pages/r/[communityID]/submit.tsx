import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import CommunityPageLayout from '../../../components/layout/community-layout.component'
import NewPostForm from '../../../components/post/new-post-form.component'

const SubmitPage: NextPage = () => {
    return (
        <CommunityPageLayout>
            <>
                <Box bg="white" padding="15px" fontWeight="400">
                    Create a new post
                </Box>
                <NewPostForm />
            </>
            <>{/* About */}</>
        </CommunityPageLayout>
    )
}

export default SubmitPage
