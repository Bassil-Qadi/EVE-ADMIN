import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiOutlineUser } from 'react-icons/hi'
import {
    // putProject,
    addCategory,
    getCategoryList,
    AddCategoryListResponse,
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import * as Yup from 'yup'

type FormModel = {
    name: string
    description: string
    file: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('Title required'),
    description: Yup.string().required('Title required')
})

const NewCategoryForm = () => {
    const dispatch = useAppDispatch()

    const currentUserId = useAppSelector((state) => state.auth.user.id)

    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)

        const formData = new FormData();
        const { name, description, file } = formValue

        formData.append('name', name)
        formData.append('description', description)
        formData.append('createdBy', currentUserId || '')
        formData.append('file', file)

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }

        const values = {
            id: currentUserId,
            name: name,
            desc: description,
            file: file
        }
        dispatch(addCategory(formData))
        dispatch(toggleNewProjectDialog(false))
        dispatch(getCategoryList())
    }

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                file: '',
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
                            invalid={errors.name && touched.name}
                            errorMessage={errors.name}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="name"
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
                invalid={errors.file && touched.file}
                errorMessage={errors.file}
            >
                <Field name="file">
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
                                            URL.createObjectURL(files[0])
                                        )
                                    }
                                    onFileRemove={(files) =>
                                        form.setFieldValue(
                                            field.name,
                                            URL.createObjectURL(files[0])
                                        )
                                    }
                                >
                                    <Avatar
                                        className="border-2 border-white dark:border-gray-800 shadow-lg"
                                        size={100}
                                        shape="circle"
                                        icon={<HiOutlineUser />}
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
