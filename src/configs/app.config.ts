export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    verifyEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'https://eve-api-e1vo.onrender.com/api/v1',
    // apiPrefix: '/api',
    authenticatedEntryPath: '/app/sales/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    verifyEntryPath: '/verify-otp',
    tourPath: '/app/account/kyc-form',
    locale: 'ar',
    enableMock: true,
}

export default appConfig
