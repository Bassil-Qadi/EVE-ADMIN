import ApiService from './ApiService'

export async function apiGetCrmDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/dashboard',
        method: 'get',
    })
}

export async function apiGetCrmCalendar<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetCrmCustomers<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'post',
        data,
    })
}

export async function apiGetCrmUsers<T, U extends Record<string, unknown>>() {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'get',
    })
}

export async function apiGetCrmCustomersStatistic<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/customers-statistic',
        method: 'get',
    })
}

export async function apPutCrmCustomer<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apCreateCrmUser<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/users`,
        method: 'post',
        data,
    })
}

export async function apPutCrmUser<T, U extends Record<string, unknown>>(
    data: U
) {
    let id = data.updatedBy
    return ApiService.fetchData<T>({
        url: `/users/${id}`,
        method: 'put',
        data,
    })
}

export async function apiGetCrmCustomerDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/crm/customer-details',
        method: 'get',
        params,
    })
}

export async function apiDeleteCrmUser<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: `/users/${data.deletedUserId}`,
        method: 'delete',
    })
}

export async function apiGetCrmMails<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
