import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import '@/components/override/swiper-overrides.css'

export type GridItemProps = {
    data: {
        _id: string
        name: string
        logo: string
        categories: {
            name: string
            _id: string
        }[]
        createdBy: {
            name: string
            id: string
        }
        images: string[]
    }
}

const GridItem = ({ data }: GridItemProps) => {
    const { name, createdBy, categories, images, logo } = data

    return (
        <Card bodyClass="h-full p-0">
            {images?.length > 0 && (
                <Swiper
                    className="mySwiper"
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                >
                    {images?.map((image) => (
                        <SwiperSlide key={image}>
                            <img src={image} alt={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            <div className="flex flex-col h-full mb-3 p-4">
                <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-4">
                        <img
                            src={logo}
                            className="w-10 h-10 rounded-full"
                            alt={name}
                        />
                        <Link to="/app/scrum-board">
                            <h6>{name}</h6>
                        </Link>
                    </div>
                    <ItemDropdown />
                </div>
                <p className="mt-4"><strong>المالك:</strong> {createdBy.name}</p>
                <div className="mt-3">
                    {/* <ProgressionBar progression={90} /> */}
                    <div className="flex items-center justify-between mt-2">
                        <Members members={categories} />
                        {/* <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiOutlineClipboardCheck className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    {10} / {12}
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem
