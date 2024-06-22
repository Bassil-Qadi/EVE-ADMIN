import { forwardRef } from 'react'
import {
    // setCustomerList,
    setUsersList,
    CreateUser,
    setCreateDrawerClose,
    useAppDispatch,
    useAppSelector,
    User
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm, { FormikRef, FormModel } from '@/views/crm/CustomerForm'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const UserCreateContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const customer = useAppSelector(
        (state) => state.crmCustomers.data.selectedCustomer
    )

    const data = useAppSelector((state) => state.crmCustomers.data.usersList)

    const onFormSubmit = (values: FormModel) => {
        const {
            name,
            email,
            phone,
            role,
            password
        } = values

        const basicInfo = { name, email, phone, role, password }
        let newData = cloneDeep(data)
        let newUser: User = {...basicInfo}
        newData.push(newUser)

        if (!isEmpty(newUser)) {
            dispatch(CreateUser(newUser as User))
        }
        dispatch(setCreateDrawerClose())
        dispatch(setUsersList(newData))
        toast.push(
            <Notification title={'Successfully Added'} type="success">
                تم إضافة المستخدم بنجاح
            </Notification>
        )
    }

    return (
        <CustomerForm
            ref={ref}
            customer={customer}
            onFormSubmit={onFormSubmit}
        />
    )
})

UserCreateContent.displayName = 'UserCreateContent'

export type { FormikRef }

export default UserCreateContent