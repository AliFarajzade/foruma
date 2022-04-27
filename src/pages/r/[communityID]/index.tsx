import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext, NextPage } from 'next'
import safeJsonStringify from 'safe-json-stringify'
import { firestore } from '../../../firebase/config.firebase'
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
    return communityData ? (
        <h1>{JSON.stringify(communityData)}</h1>
    ) : (
        <h1>Not found</h1>
    )
}

export default CommunityPage
