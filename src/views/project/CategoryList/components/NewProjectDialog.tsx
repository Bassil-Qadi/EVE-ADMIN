import Dialog from '@/components/ui/Dialog'
import NewCategoryForm from './NewCategoryForm'
import {
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

const NewProjectDialog = () => {
    const dispatch = useAppDispatch()

    const newProjectDialog = useAppSelector(
        (state) => state.categoryList.data.newProjectDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewProjectDialog(false))
    }

    return (
        <Dialog
            isOpen={newProjectDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>إضافة صنف جديد</h4>
            <div className="mt-4">
                <NewCategoryForm />
            </div>
        </Dialog>
    )
}

export default NewProjectDialog
