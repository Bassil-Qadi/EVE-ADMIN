import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Loading from '@/components/shared/Loading'
import TextEllipsis from '@/components/shared/TextEllipsis'
import Confirmations from './Confirmations'
import {
    getPages,
    toggleArticleDeleteConfirmation,
    toggleAddPage,
    toggleEditPage,
    setSelected,
    useAppDispatch,
    useAppSelector,
    Page,
} from '../store'

import { motion } from 'framer-motion'
import {
    HiOutlineTrash,
    HiOutlinePencil,
    HiOutlinePlus,
    HiCalendar
} from 'react-icons/hi'
import dayjs from 'dayjs'

const CategorySection = ({ data }: { data: Page }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [collapse, ] = useState(false)

    const onArticleEdit = (data: Page) => {
        dispatch(setSelected(data))
        navigate(`/app/pages/edit-page?id=${data?._id}&title=${data?.title}&description=${data?.description}`)
        // dispatch(toggleEditPage(true))
    }

    const onArticleDelete = (id: string) => {
        dispatch(setSelected({ id }))
        dispatch(toggleArticleDeleteConfirmation(true))
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{
                    opacity: collapse ? 0 : 1,
                    height: collapse ? 0 : 'auto',
                }}
                transition={{ duration: 0.15 }}
            >
                {data && (
                    <Card key={data._id} bordered>
                        <h6 className="truncate capitalize mb-4">{data?.title}</h6>
                        <div className="min-h-[60px]">
                            <TextEllipsis
                                text={data?.description.replace(
                                    /<[^>]*>?/gm,
                                    '',
                                )}
                                maxTextCount={120}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            {/* <UsersAvatarGroup
                                avatarProps={{ size: 25 }}
                                users={article.authors || []}
                            /> */}
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiCalendar className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                                </span>
                            </div>
                            <div className="flex">
                                <Tooltip title="Delete">
                                    <Button
                                        shape="circle"
                                        variant="plain"
                                        size="sm"
                                        icon={<HiOutlineTrash />}
                                        onClick={() =>
                                            onArticleDelete(data?._id)
                                        }
                                    />
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <Button
                                        shape="circle"
                                        variant="plain"
                                        size="sm"
                                        icon={<HiOutlinePencil />}
                                        onClick={() => onArticleEdit(data)}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </Card>
                )}
            </motion.div>
        </div>
    )
}

const Articles = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.loading,
    )
    const pages = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.pages,
    )

    const [collapse, ] = useState(false)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getPages())
    }

    const onArticlePage = () => {
        dispatch(toggleAddPage(true))
        // navigate(
        //     `/app/knowledge-base/edit-article?categoryLabel=${data.label}&categoryValue=${data.value}`
        // )
    }

    return (
        <Loading loading={loading}>
                <motion.div
                    className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4"
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{
                        opacity: collapse ? 0 : 1,
                        height: collapse ? 0 : 'auto',
                    }}
                    transition={{ duration: 0.15 }}
                >
                    <Card
                        clickable
                        className="group border-dashed border-2 hover:border-indigo-600"
                        onClick={onArticlePage}
                    >
                        <div className="flex flex-col justify-center items-center py-5">
                            <div className="p-4 border-2 border-dashed rounded-full border-gray-200 dark:border-gray-600 group-hover:border-indigo-600">
                                <HiOutlinePlus className="text-4xl text-gray-200 dark:text-gray-600 group-hover:text-indigo-600" />
                            </div>
                            <p className="mt-5 font-semibold">Add New Page</p>
                        </div>
                    </Card>
                {pages?.map((page) => <CategorySection key={page._id} data={page} />)}
                </motion.div>
            <Confirmations data={pages} />
        </Loading>
    )
}

export default Articles
