import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCloudUpload } from 'react-icons/hi'
import {
    addBanner,
    getBannersList,
    toggleNewBannerDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import * as Yup from 'yup'

type FormModel = {
    title: string
    description: string
    saloonId?: string
    userId?: string
    image: string
}

const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, 'Too Short!').required('Title required'),
    description: Yup.string().required('Title required'),
})

const NewCategoryForm = () => {
    const dispatch = useAppDispatch()

    const currentUserId = useAppSelector((state) => state.auth.user.id)

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
    ) => {
        setSubmitting(true)

        const formData = new FormData()
        const { title, description, saloonId, userId, image } = formValue

        formData.append('title', title)
        formData.append('description', description)
        formData.append('saloonId', '66656459b0a535ea879ac0ad' || '')
        formData.append('userId', currentUserId || '')
        formData.append('image', image)

        let responseData = dispatch(addBanner(formData))
        
        responseData.then(data => {
            if(data.payload.statusCode === 201) {
                dispatch(toggleNewBannerDialog(false))
                dispatch(getBannersList())
                toast.push(
                    <Notification title={'Successfully Added'} type="success">
                        تم إضافة العرض بنجاح
                    </Notification>
                )
            }
        })
    }

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                image: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            label="العنوان"
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="ادخل عنوان العرض"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="التفاصيل"
                            invalid={errors.description && touched.description}
                            errorMessage={errors.description}
                        >
                            <Field
                                textArea
                                type="text"
                                autoComplete="off"
                                name="description"
                                placeholder="ادخل تفاصيل العرض"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            invalid={errors.image && touched.image}
                            errorMessage={errors.image}
                        >
                            <Field name="image">
                                {({ field, form }: FieldProps) => {
                                    const avatarProps = field.value
                                        ? { src: URL.createObjectURL(field.value) }
                                        : {}
                                    return (
                                        <div className="flex justify-center">
                            
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        files[0]
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        URL.createObjectURL(
                                                            files[0],
                                                        ),
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={100}
                                                    icon={<HiCloudUpload  />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        </div>
                                    )
                                }}
                            </Field>
                        </FormItem>
                        <Button block variant="solid" type="submit">
                            إضافة
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewCategoryForm
