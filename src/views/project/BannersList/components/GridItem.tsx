import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import { HiBadgeCheck, HiBan } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export type GridItemProps = {
    data: {
        _id: string,
        title: string,
        description: string,
        image: string,
        saloonId: string,
        userId: string,
        status: string
    }
}

const GridItem = ({ data }: GridItemProps) => {
    const { _id, title, description, image, status } = data

    return (
        <Card bodyClass="h-full p-0">
            <img className="w-full h-52 mb-3" src={image} alt={title} />
            <div className="flex flex-col h-full p-4">
                <div className="flex justify-between">
                <h6>{title}</h6>
                    <ItemDropdown bannerId={_id} />
                </div>
                <p className="mt-4">{description}</p>
                <div className="mt-3">

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                {status ? <HiBadgeCheck className="text-base" /> : <HiBan  className="text-base" />}
                                <span className={`ml-1 rtl:mr-1 whitespace-nowrap ${status ? 'text-600-green' : 'text-600-red'}`}>
                                    {status ? 'Active' : 'Not Active'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        
    )
}

export default GridItem
