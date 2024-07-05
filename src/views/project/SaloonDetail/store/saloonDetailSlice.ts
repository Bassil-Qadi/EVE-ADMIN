import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSaloonDetails,
    apiGetCrmCustomerDetails,
    // apiDeleteCrmCustomer,
    apPutCrmCustomer,
} from '@/services/CrmService'

import { apPutSaloon } from '@/services/ProjectService'

export const SLICE_NAME = 'projectSaloonDetails'

type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

export type OrderHistory = {
    _id: string
    day: string
    open: string
    close: string
}

export type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

export type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

export type Saloon = {
    _id: string
    name: string
    phone: string
    categories: []
    createdBy: {
        name: string
        id: string
    }
    workingTime: []
    logo: string
    images: []
    type: string
    isActive: boolean
    createdAt: string
    address: string
    facebook: string
    snapchat: string
    tiktok: string
    instagram: string
}

export type Customer = {
    id: string
    name: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    personalInfo: PersonalInfo
}

type GetSaloonDetailsResponse = Saloon & {
    orderHistory?: OrderHistory[]
    paymentMethod?: PaymentMethod[]
    subscription?: Subscription[]
}

type GetSaloonDetailsRequest = { id: string }

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteCrmCustomerResponse = {}

type DeleteCrmCustomerRequest = { id: string }

export type CustomerDetailState = {
    loading: boolean
    profileData: Partial<Saloon>
    subscriptionData: Subscription[]
    paymentHistoryData: OrderHistory[]
    paymentMethodData: PaymentMethod[]
    deletePaymentMethodDialog: boolean
    editPaymentMethodDialog: boolean
    editSaloonDetailDialog: boolean
    selectedCard: Partial<PaymentMethod>
}

export const getCustomer = createAsyncThunk(
    SLICE_NAME + '/getCustomer',
    async (data: GetSaloonDetailsRequest) => {
        const response = await apiGetCrmCustomerDetails<
            GetSaloonDetailsResponse,
            GetSaloonDetailsRequest
        >(data)
        return response.data
    }
)

export const getSaloon = createAsyncThunk(
    SLICE_NAME + '/getSaloon',
    async (data: any) => {
        const response = await apiGetSaloonDetails<
            GetSaloonDetailsResponse,
            GetSaloonDetailsRequest
        >(data)
        return response.data
    }
)

// export const deleteCustomer = createAsyncThunk(
//     SLICE_NAME + '/deleteCustomer',
//     async (data: DeleteCrmCustomerRequest) => {
//         const response = await apiDeleteCrmCustomer<
//             DeleteCrmCustomerResponse,
//             DeleteCrmCustomerRequest
//         >(data)
//         return response.data
//     }
// )

export const putCustomer = createAsyncThunk(
    SLICE_NAME + '/putCustomer',
    async (data: Saloon) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

export const putSaloon = createAsyncThunk(
    SLICE_NAME + '/putSaloon',
    async (data: Saloon) => {
        const response = await apPutSaloon(data)
        return response.data
    }
)

const initialState: CustomerDetailState = {
    loading: false,
    profileData: {},
    subscriptionData: [],
    paymentHistoryData: [],
    paymentMethodData: [],
    deletePaymentMethodDialog: false,
    editPaymentMethodDialog: false,
    editSaloonDetailDialog: false,
    selectedCard: {},
}

const saloonDetailSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setSelectedSaloon: (state, action) => {
            state.profileData = action.payload
        },
        updatePaymentMethodData: (state, action) => {
            state.paymentMethodData = action.payload
        },
        updateProfileData: (state, action) => {
            state.profileData = action.payload
        },
        openDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = true
        },
        closeDeletePaymentMethodDialog: (state) => {
            state.deletePaymentMethodDialog = false
        },
        openEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = true
        },
        closeEditPaymentMethodDialog: (state) => {
            state.editPaymentMethodDialog = false
        },
        openEditSaloonDetailDialog: (state) => {
            state.editSaloonDetailDialog = true
        },
        closeEditSaloonDetailDialog: (state) => {
            state.editSaloonDetailDialog = false
        },
        updateSelectedCard: (state, action) => {
            state.selectedCard = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSaloon.pending, (state) => {
                state.loading = true
            })
            .addCase(getSaloon.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getSaloon.rejected, (state) => {
                state.loading = false
            })
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.profileData = action.payload
                state.subscriptionData = action.payload?.subscription || []
                state.paymentHistoryData = action.payload?.orderHistory || []
                state.paymentMethodData = action.payload?.paymentMethod || []
            })
            // .addCase(getCustomer.pending, (state) => {
            //     state.loading = true
            // })
    },
})

export const {
    updatePaymentMethodData,
    updateProfileData,
    openDeletePaymentMethodDialog,
    closeDeletePaymentMethodDialog,
    openEditPaymentMethodDialog,
    closeEditPaymentMethodDialog,
    openEditSaloonDetailDialog,
    closeEditSaloonDetailDialog,
    updateSelectedCard,
    setSelectedSaloon
} = saloonDetailSlice.actions

export default saloonDetailSlice.reducer
