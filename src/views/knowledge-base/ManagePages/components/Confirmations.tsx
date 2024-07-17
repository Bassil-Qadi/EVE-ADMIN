import { useRef } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    setPages,
    toggleAddPage,
    toggleEditPage,
    toggleArticleDeleteConfirmation,
    deletePage,
    addPage,
    updatePage,
    getPages,
    useAppDispatch,
    useAppSelector,
    Page,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const Confirmations = ({ data }: { data: Page[] }) => {
    const dispatch = useAppDispatch()

    const categoryAddTitleInputRef = useRef<HTMLInputElement>(null)
    const categoryAddDescInputRef = useRef<HTMLInputElement>(null)

    const articleDeleteConfirmation = useAppSelector(
        (state) =>
            state.knowledgeBaseManagePages.data.articleDeleteConfirmation,
    )

    const pageAddDialog = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.pageAddDialog,
    )
    const pageEditDialog = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.pageEditDialog,
    )
    const selected = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.selected,
    )

    const currentUserId = useAppSelector((state) => state.auth.user.id)

    const onArticleDeleteConfirmationClose = () => {
        dispatch(toggleArticleDeleteConfirmation(false))
    }

    const onArticleDeleteConfirm = () => {
        const allPages = cloneDeep(data)
        const removedData = allPages.filter((page) => page._id !== selected.id)
        dispatch(toggleArticleDeleteConfirmation(false))
        let response = dispatch(deletePage(selected.id))
        response.then((data) => {
            if (data.payload) {
                toast.push(
                    <Notification title={'Successfully Deleted'} type="success">
                        تم حذف الصفحة بنجاح
                    </Notification>,
                )
                dispatch(getPages())
            }
        })
        // dispatch(setPages(removedData))
    }

    const onFagEditConfirm = () => {
        const allPages = cloneDeep(data)
        const editedPages = allPages.map((page) => {
            if (page._id === selected.id) {
                return {
                    ...page,
                    title:
                        categoryAddTitleInputRef.current!.value || page.title,
                    description:
                        categoryAddDescInputRef.current!.value ||
                        page.description,
                }
            }
            return page
        })

        dispatch(setPages(editedPages))
        dispatch(
            updatePage({
                id: selected.id,
                title:
                    categoryAddTitleInputRef.current!.value || selected.title,
                description:
                    categoryAddDescInputRef.current!.value ||
                    selected.description,
                updatedBy: currentUserId,
            }),
        )
        dispatch(toggleEditPage(false))
    }

    const onFaqAddDialogClose = () => {
        dispatch(toggleAddPage(false))
    }

    const onFaqEditDialogClose = () => {
        dispatch(toggleEditPage(false))
    }

    const onCategoryAddDialogConfirm = () => {
        if (
            categoryAddTitleInputRef.current &&
            categoryAddDescInputRef.current
        ) {
            let returndedData = dispatch(
                addPage({
                    title: categoryAddTitleInputRef.current.value,
                    description: categoryAddDescInputRef.current.value,
                    createdBy: currentUserId,
                }),
            )

            returndedData.then((data) => {
                if (data.payload) {
                    dispatch(getPages())
                    toast.push(
                        <Notification
                            title={'Successfully Added'}
                            type="success"
                        >
                            تم إضافة الصفحة بنجاح
                        </Notification>,
                    )
                }
            })
            dispatch(toggleAddPage(false))
        }
    }

    return (
        <>
            <ConfirmDialog
                isOpen={articleDeleteConfirmation}
                type="danger"
                title="حذف الصفحة"
                confirmButtonColor="red-600"
                onClose={onArticleDeleteConfirmationClose}
                onRequestClose={onArticleDeleteConfirmationClose}
                onCancel={onArticleDeleteConfirmationClose}
                onConfirm={onArticleDeleteConfirm}
            >
                <p>
                    هل أنت متأكد من أنك تريد حذف هذه الصفحة؟ لا يمكن التراجع عن
                    هذا الإجراء.
                </p>
            </ConfirmDialog>
            <Dialog
                isOpen={pageAddDialog}
                onClose={onFaqAddDialogClose}
                onRequestClose={onFaqAddDialogClose}
            >
                <h5 className="mb-4">إضافة صفحة</h5>
                <div className="mb-4">
                    <label className="mb-2">العنوان</label>
                    <Input ref={categoryAddTitleInputRef} />
                </div>
                <div>
                    <label className="mb-2">الموضوع</label>
                    <Input ref={categoryAddDescInputRef} />
                </div>
                <div className="text-right mt-6">
                    <Button
                        size="sm"
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onFaqAddDialogClose}
                    >
                        إلغاء
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={onCategoryAddDialogConfirm}
                    >
                        إضافة
                    </Button>
                </div>
            </Dialog>
            <Dialog
                isOpen={pageEditDialog}
                onClose={onFaqEditDialogClose}
                onRequestClose={onFaqEditDialogClose}
            >
                <h5 className="mb-4">تعديل الصفحة</h5>
                <div className="mb-4">
                    <label className="mb-2">العنوان</label>
                    <Input
                        ref={categoryAddTitleInputRef}
                        placeholder={selected?.title}
                    />
                </div>
                <div>
                    <label className="mb-2">الموضوع</label>
                    <Input
                        ref={categoryAddDescInputRef}
                        placeholder={selected?.description}
                    />
                </div>
                <div className="text-right mt-6">
                    <Button
                        size="sm"
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onFaqEditDialogClose}
                    >
                        إلغاء
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={onFagEditConfirm}
                    >
                        حفظ
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default Confirmations
