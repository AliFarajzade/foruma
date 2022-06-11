import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import safeJsonStringify from 'safe-json-stringify'
import AboutCommunity from '../../../components/community/about-community.component'
import CommunityHeader from '../../../components/community/community-header.component'
import CreatePostLink from '../../../components/community/create-post-link.component'
import CommunityPageLayout from '../../../components/layout/community-layout.component'
import NotFound from '../../../components/not-found/not-found.component'
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
        console.log(error)
        return {
            props: {
                communityData: null,
            },
        }
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
    }, [communityData, setCommunitySnippetState])

    return communityData ? (
        <>
            <CommunityHeader communityData={communityData} />
            <CommunityPageLayout>
                <>
                    <CreatePostLink />
                    <Posts communityData={communityData} />
                </>
                <>
                    <AboutCommunity currentCommunity={communityData} />
                </>
            </CommunityPageLayout>
        </>
    ) : (
        <NotFound message="Sorry, this community may not exist or has been banned." />
    )
}

export default CommunityPage
