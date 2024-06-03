import DatePicker from '@/components/ui/DatePicker'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import {
    HiUserCircle,
    HiMail,
    HiPhone,
    HiOutlineUser,
    HiLockOpen  
} from 'react-icons/hi'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'

type Option = {
    value: boolean | string
    label: string
    color: string
}

type FormFieldsName = {
    upload: string
    name: string
    title: string
    email: string
    phone: string,
    role: string,
    passowrd?: string
}

type PersonalInfoFormProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const options: Option[] = [
    { value: "admin", label: 'Admin', color: 'bg-emerald-500' },
    { value: "user", label: 'User', color: 'bg-red-500' },
]

const PersonalInfoForm = (props: PersonalInfoFormProps) => {
    const { touched, errors } = props

    return (
        <>
            <FormItem
                invalid={errors.upload && touched.upload}
                errorMessage={errors.upload}
            >
                <Field name="img">
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
            <FormItem
                label="Name"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
            >
                <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                    prefix={<HiMail className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Passowrd"
                invalid={errors.passowrd && touched.passowrd}
                errorMessage={errors.passowrd}
            >
                <Field
                    type="password"
                    autoComplete="off"
                    name="password"
                    placeholder="Passowrd"
                    component={Input}
                    prefix={<HiLockOpen className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Role"
                invalid={errors.role && touched.role}
                errorMessage={errors.role}
            >
                <Field name="role">
                {({ field, form }: FieldProps) => {
                    return <Select 
                    options={options}
                    size="sm"
                    className="min-w-[130px]"
                    onChange={(e) => {
                        form.setFieldValue(
                            field.name,
                            e?.value
                        )
                    }}
                />
                }}
                </Field>
                
            </FormItem>
            <FormItem
                label="Phone Number"
                invalid={errors.phone && touched.phone}
                errorMessage={errors.phone}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="phone"
                    placeholder="Phone"
                    component={Input}
                    prefix={<HiPhone className="text-xl" />}
                />
            </FormItem>
        </>
    )
}

export default PersonalInfoForm
