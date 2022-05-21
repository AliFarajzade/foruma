import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import safeJsonStringify from 'safe-json-stringify'
import AboutCommunity from '../../../components/community/about-community.component'
import CommunityHeader from '../../../components/community/community-header.component'
import CreatePostLink from '../../../components/community/create-post-link.component'
import CommunityPageLayout from '../../../components/layout/community-layout.component'
import CommunityNotFound from '../../../components/not-found/no-community.component'
import Posts from '../../../components/post/posts.component'
import { firestore } from '../../../firebase/config.firebase'
import communitySnippetStateAtom from '../../../recoil/atoms/community.atom'
import { TCommunity } from '../../../types/community.types'

interface IProps {
    communityData: TCommunity | null
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const communityRef = doc(
        firestore,
        'communities',
        context.query.communityID as unknown as string
    )
    try {
        const communitySnap = await getDoc(communityRef)

        if (communitySnap.exists()) {
            return {
                props: {
                    communityData: JSON.parse(
                        safeJsonStringify({
                            id: communitySnap.id,
                            ...communitySnap.data(),
                        })
                    ),
                },
            }
        } else {
            return {
                props: {
                    communityData: null,
                },
            }
        }
    } catch (error) {
        console.log('Get server-side props error: ', error)
    }
}

const CommunityPage: NextPage<IProps> = ({ communityData }) => {
    const setCommunitySnippetState = useSetRecoilState(
        communitySnippetStateAtom
    )

    useEffect(() => {
        if (communityData)
            setCommunitySnippetState(prevState => ({
                ...prevState,
                currentCommunity: communityData,
            }))
    }, [])

    return communityData ? (
        <>
            <CommunityHeader communityData={communityData} />
            <CommunityPageLayout>
                <>
                    <CreatePostLink />
                    <Posts />
                </>
                <>
                    <AboutCommunity currentCommunity={communityData} />
                </>
            </CommunityPageLayout>
        </>
    ) : (
        <CommunityNotFound />
    )
}

export default CommunityPage
