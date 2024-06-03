import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCloudUpload  } from 'react-icons/hi'
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
        formData.append('saloonId', saloonId || '')
        formData.append('userId', userId || '')
        formData.append('image', image)
        formData.append('status', 'true')

        dispatch(addBanner(formData))
        dispatch(toggleNewBannerDialog(false))
        dispatch(getBannersList())
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
                            label="Title"
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Enter title"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Description"
                            invalid={errors.description && touched.description}
                            errorMessage={errors.description}
                        >
                            <Field
                                textArea
                                type="text"
                                autoComplete="off"
                                name="description"
                                placeholder="Enter Description"
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
                                        ? { src: field.value }
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
                                                        URL.createObjectURL(
                                                            files[0],
                                                        ),
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
                            Submit
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewCategoryForm
