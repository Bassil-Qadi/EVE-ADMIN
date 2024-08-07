import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    OtpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/admin/login',
        method: 'post',
        data
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/auth/register',
        method: 'post',
        data,
    })
}

export async function apiVerifyOtp(data: OtpCredential) {
    return ApiService.fetchData<any>({
        url: '/auth/user/verify-otp',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
