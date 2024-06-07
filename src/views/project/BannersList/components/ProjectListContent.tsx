import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Spinner from '@/components/ui/Spinner'
import { getBannersList, deleteBanner, useAppDispatch, useAppSelector, toggleDeleteBannerDialog } from '../store'

const ProjectListContent = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.bannersList.data.loading)
    const bannersList = useAppSelector(
        (state) => state.bannersList.data.bannersList
    )
    
    const view = useAppSelector((state) => state.bannersList.data.view)
    const { sort, search } = useAppSelector(
        (state) => state.bannersList.data.query
    )
    const dialogOpen = useAppSelector(
        (state) => state.bannersList.data.deleteBannerDialog
    )

    const selectedCategory = useAppSelector(
        (state) => state.bannersList.data.deletedBannerId
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteBannerDialog(false))
    }

    const onDeleteBanner = () => {
        dispatch(deleteBanner(selectedCategory))
    }

    useEffect(() => {
        dispatch(getBannersList())
    }, [dispatch, sort, search])


    return (
        <><div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
            {view === 'grid' && bannersList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {bannersList?.filter(banner => banner.title.toLocaleLowerCase().startsWith(search))?.map((banner) => (
                        <GridItem key={banner._id} data={banner} />
                    ))}
                </div>
            )}
            {view === 'list' &&
                bannersList.length > 0 &&
                !loading &&
                bannersList?.filter(banner => banner.title.toLocaleLowerCase().startsWith(search))?.map((banner) => (
                    <ListItem key={banner._id} data={banner} />
                ))}
        </div>
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="حذف العرض"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDeleteBanner}
        >
                <p>
                هل أنت متأكد من أنك تريد حذف هذا العرض؟ سيتم حذف جميع السجلات المتعلقة بهذا العرض أيضًا. لا يمكن التراجع عن هذا الإجراء.
                </p>
            </ConfirmDialog></>
    )
}

export default ProjectListContent
