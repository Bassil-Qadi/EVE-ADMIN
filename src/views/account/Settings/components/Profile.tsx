import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Switcher from '@/components/ui/Switcher'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FormContainer } from '@/components/ui/Form'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineBriefcase,
    HiOutlineUser,
    HiCheck,
    HiOutlineGlobeAlt,
    HiOutlinePhone 
} from 'react-icons/hi'
import * as Yup from 'yup'
import type { OptionProps, ControlProps } from 'react-select'
import type { FormikProps, FieldInputProps, FieldProps } from 'formik'

export type ProfileFormModel = {
    name: string
    email: string
    title: string
    avatar: string
    timeZone: string
    role: string
    syncData: boolean
}

type ProfileProps = {
    data?: ProfileFormModel
}

type LanguageOption = {
    value: string
    label: string
}

const { Control } = components

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('User Name Required'),
        email: Yup.string().email('Invalid email').required('Email Required'),
        title: Yup.string(),
        avatar: Yup.string(),
        lang: Yup.string(),
        timeZone: Yup.string(),
        syncData: Yup.bool(),
})

const langOptions: LanguageOption[] = [
    { value: 'user', label: 'مستخدم' },
    { value: 'ch', label: 'مسؤول' }
]

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<LanguageOption>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({
    children,
    ...props
}: ControlProps<LanguageOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {children}
        </Control>
    )
}

const Profile = ({
    data = {
        name: '',
        email: '',
        title: '',
        avatar: '',
        timeZone: '',
        role: '',
        syncData: false,
    },
}: ProfileProps) => {
    const onSetFormFile = (
        form: FormikProps<ProfileFormModel>,
        field: FieldInputProps<ProfileFormModel>,
        file: File[]
    ) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    const onFormSubmit = (
        values: ProfileFormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('values', values)
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="عام"
                                desc="المعلومات الأساسية، مثل اسمك وعنوانك التي سيتم عرضها للعامة"
                            />
                            <FormRow
                                name="name"
                                label="الاسم"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="الاسم"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label="البريد الإلكتروني"
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="البريد الإلكتروني"
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            {/* <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                                <Field name="avatar">
                                    {({ field, form }: FieldProps) => {
                                        const avatarProps = field.value
                                            ? { src: field.value }
                                            : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                showList={false}
                                                uploadLimit={1}
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow> */}
                            <FormRow
                                name="title"
                                label="رقم الجوال"
                                {...validatorProps}
                                
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="title"
                                    placeholder="رقم الجوال"
                                    component={Input}
                                    prefix={
                                        <HiOutlinePhone className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="role"
                                label="الدور"
                                {...validatorProps}
                            >
                                <Field name="role">
                                    {({ field, form }: FieldProps) => (
                                        <Select<LanguageOption>
                                            field={field}
                                            form={form}
                                            options={langOptions}
                                            components={{
                                                Option: CustomSelectOption,
                                                Control: CustomControl,
                                            }}
                                            value={langOptions.filter(
                                                (option) =>
                                                    option.value ===
                                                    values?.role
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'جاري التحديث...' : 'تحديث'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
