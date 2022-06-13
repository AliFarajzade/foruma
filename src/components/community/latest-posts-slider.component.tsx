// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { useMediaQuery } from '@chakra-ui/react'
import { Navigation } from 'swiper'
import { TPost } from '../../types/post.types'
import LatestPostCard from './latest-post-card.component'

interface IProps {
    posts: TPost[]
}

const LatestPostsSlider: React.FC<IProps> = ({ posts }) => {
    const [isLargerThan950px] = useMediaQuery('(min-width: 951px)')
    const [isLargerThan740px] = useMediaQuery('(min-width: 740px)')
    const [isLargerThan500px] = useMediaQuery('(min-width: 500px)')

    return (
        <Swiper
            slidesPerView={
                isLargerThan950px
                    ? 4
                    : isLargerThan740px
                    ? 3
                    : isLargerThan500px
                    ? 2
                    : 1
            }
            spaceBetween={5}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
        >
            {posts.map(postObj => (
                <SwiperSlide key={postObj.ID}>
                    <LatestPostCard post={postObj} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default LatestPostsSlider
