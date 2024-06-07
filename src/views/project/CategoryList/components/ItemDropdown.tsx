import { useAppDispatch, toggleDeleteCategoryDialog, setDeletedCategoryId } from '../store'
import Dropdown from '@/components/ui/Dropdown'
import {
    HiOutlineSwitchHorizontal,
    HiOutlineFlag,
    HiOutlineCog,
    HiOutlineFolderRemove 
} from 'react-icons/hi'
import EllipsisButton from '@/components/shared/EllipsisButton'


const ItemDropdown = ({ categoryId }: any) => {
    
    const dispatch = useAppDispatch()
    const handleOpenDeleteCategory = () => {
        dispatch(toggleDeleteCategoryDialog(true))
        dispatch(setDeletedCategoryId(categoryId))
    }
    
    const dropdownList = [
        { label: 'إضافة مرجع', value: 'addFlag', icon: <HiOutlineFlag /> },
        { label: 'نقل', value: 'move', icon: <HiOutlineSwitchHorizontal /> },
        { label: 'الإعدادات', value: 'projectSetting', icon: <HiOutlineCog /> },
        { label: 'حذف', value: 'categoryRemove', icon: <HiOutlineFolderRemove  />, click: handleOpenDeleteCategory },
    ]

    return (
        <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
            {dropdownList.map((item) => (
                <Dropdown.Item key={item.value} eventKey={item.value} onClick={item.click}>
                    <span className="text-lg">{item.icon}</span>
                    <span className="ml-2 rtl:mr-2">{item.label}</span>
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default ItemDropdown
