import { forwardRef } from 'react'
import Tabs from '@/components/ui/Tabs'
import { FormContainer } from '@/components/ui/Form'
import { Form, Formik, FormikProps } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import SocialLinkForm from './SocialLinkForm'

type BaseCustomerInfo = {
    name: string
    email: string
    img: string,
    phone: string,
    role: string,
    password?: string
}

export type Customer = BaseCustomerInfo 

export type FormModel = Customer

export type FormikRef = FormikProps<FormModel>

export type CustomerProps = Partial<
    BaseCustomerInfo 
>

type CustomerFormProps = {
    action: string
    customer: CustomerProps,
    onFormSubmit: (values: FormModel) => void
}

dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    name: Yup.string().required('User Name Required'),
    phone: Yup.string().matches(
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
        'Phone number is not valid'
    ),
    role: Yup.string().required("Role is Required"),
    img: Yup.string(),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef<FormikRef, CustomerFormProps>((props, ref) => {
    const { action, customer, onFormSubmit } = props

    return (
        <Formik<FormModel>
            innerRef={ref}
            initialValues={{
                name: customer.name || '',
                email: customer.email || '',
                img: customer.img || '',
                phone: customer?.phone || '',
                role: customer?.role || '',
                // password: customer?.password || ''
                ...(action !== 'edit' && { password: customer?.password || '' })
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors }) => (
                <Form>
                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    Personal Info
                                </TabNav>
                                <TabNav value="social">Social</TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        mode={action}
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent>
                                <TabContent value="social">
                                    {/* <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    /> */}
                                </TabContent>
                            </div>
                        </Tabs>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

CustomerForm.displayName = 'CustomerForm'

export default CustomerForm
