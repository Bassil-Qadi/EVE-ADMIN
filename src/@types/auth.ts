export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    otp: string | undefined
    // token: string
    // user: {
    //     userName: string
    //     authority: string[]
    //     avatar: string
    //     email: string
    // }
    tokens: {
        access: {
            token: string,
            expires: string
        },
        refresh: {
            token: string,
            expires: string
        }
    },
    user: {
        name: string,
        phone: string,
        email: string,
        isVerified: boolean,
        role: string,
        createdAt: string,
        updatedAt: string,
        id: string
    }
    data: {
            otp: string
            user: {
            name: string,
            phone: string,
            email: string,
            isVerified: boolean,
            role: string,
            createdAt: string,
            updatedAt: string,
            id: string
        }
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    name: string
    email: string
    password: string
    phone: string
    fcmToken: string | undefined
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type OtpCredential = {
    otp: string
    phone: string | undefined
}