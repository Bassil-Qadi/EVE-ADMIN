import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    avatar?: string
    name?: string
    email?: string
    isVerified?: boolean
    authority?: string[],
    role?: string,
    phone?: string,
    id?: string
    otp?: string
}

const initialState: UserState = {
    avatar: '',
    name: '',
    email: '',
    isVerified: false,
    authority: [],
    role: '',
    phone: '',
    id: '',
    otp: ''
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.name = action.payload?.name
            state.isVerified = action.payload?.isVerified
            state.authority = action.payload?.authority
            state.role = action.payload?.role
            state.phone = action.payload?.phone
            state.id = action.payload?.id
            state.otp = action.payload?.otp
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
