import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Spinner from '@/components/ui/Spinner'
import { getCategoryList, deleteCategory, useAppDispatch, useAppSelector, toggleDeleteCategoryDialog } from '../store'

const ProjectListContent = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.categoryList.data.loading)
    const categoryList = useAppSelector(
        (state) => state.categoryList.data.categoriesList
    )
    
    const view = useAppSelector((state) => state.categoryList.data.view)
    const { sort, search } = useAppSelector(
        (state) => state.categoryList.data.query
    )
    const dialogOpen = useAppSelector(
        (state) => state.categoryList.data.deleteCategoryDialog
    )

    const selectedCategory = useAppSelector(
        (state) => state.categoryList.data.deletedCategoryId
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteCategoryDialog(false))
    }

    const onDeleteCategory = () => {
        dispatch(deleteCategory(selectedCategory))
    }

    useEffect(() => {
        dispatch(getCategoryList())
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
            {view === 'grid' && categoryList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoryList?.filter(category => category.name.toLocaleLowerCase()?.startsWith(search))?.map((categoty) => (
                        <GridItem key={categoty._id} data={categoty} />
                    ))}
                </div>
            )}
            {view === 'list' &&
                categoryList.length > 0 &&
                !loading &&
                categoryList?.filter(category => category.name.toLocaleLowerCase()?.startsWith(search))?.map((categoty) => (
                    <ListItem key={categoty._id} data={categoty} />
                ))}
        </div>
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete category"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDeleteCategory}
        >
                <p>
                    Are you sure you want to delete this category? All record
                    related to this category will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog></>
    )
}

export default ProjectListContent
