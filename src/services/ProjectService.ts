import ApiService from './ApiService'

export async function apiGetProjectDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/project/dashboard',
        method: 'get',
    })
}

export async function apiGetCategoryList<T, U extends Record<string, unknown>>(
    
) {
    return ApiService.fetchData<T>({
        url: '/admin/categories',
        method: 'get',
    })
}

export async function apiGetProjectList<T, U extends Record<string, unknown>>(
    
) {
    return ApiService.fetchData<T>({
        url: '/admin/all-saloons',
        method: 'get',
    })
}

export async function apiAddSaloon<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/saloon/create',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function apPutSaloon<T, U extends Record<string, unknown>>(
    data: U
) {

    let id = data.get("_id")

    return ApiService.fetchData<T>({
        url: `/saloon/${id}`,
        method: 'put',
        data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export async function apiChangeSaloonStatus<T, U extends Record<string, unknown>>(
    data: U
) {

    return ApiService.fetchData<T>({
        url: `/admin/saloons/changeStatus`,
        method: 'put',
        data
    })
}


export async function apiDeleteSaloon<T>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: `/saloon/${data}`,
        method: 'delete',
    })
}

export async function apiAddCategoryList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/categories/create',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function apiDeleteCategoryList<T>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: `/admin/categories/${data}`,
        method: 'delete',
    })
}

export async function apiPutCategory<T, U extends Record<string, unknown>>(
    data: U
) {
    let categoryId = data.get("categoryId")
    return ApiService.fetchData<T>({
        url: `/admin/categories/${categoryId}`,
        method: 'put',
        data,
    })
}

export async function apiPutProjectList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/project/list/add',
        method: 'put',
        data,
    })
}

export async function apiGetScrumBoards<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/boards',
        method: 'post',
    })
}

export async function apiGetScrumBoardtMembers<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/members',
        method: 'post',
    })
}

export async function apiGetScrumBoardtTicketDetail<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/tickets/detail',
        method: 'get',
    })
}


export async function apiGetSaloonsList<T, U extends Record<string, unknown>>(
    
) {
    return ApiService.fetchData<T>({
        url: '/admin/all-saloons',
        method: 'get',
    })
}

export async function apiAddBannerList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/admin/banners/create',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function apiGetBannersList<T, U extends Record<string, unknown>>(
    
) {
    return ApiService.fetchData<T>({
        url: '/admin/banners',
        method: 'get',
    })
}

export async function apiPutBanner<T, U extends Record<string, unknown>>(
    data: U
) {

    let bannerId = data.get('bannerId')
    data.delete('bannerId')

    return ApiService.fetchData<T>({
        url: `/admin/banners/${bannerId}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteBannerList<T>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: `/admin/banners/${data}`,
        method: 'delete',
    })
}

export async function apiGetSaloonServices<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/saloon/${data.saloonId}/services`,
        method: 'get',
    })
}

export async function apiGetSaloonUsers<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/saloon/users',
        method: 'post',
        data
    })
}

export async function apiGetOffersList<T, U extends Record<string, unknown>>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: `/offers/saloon/${data}`,
        method: 'get',
    })
}


export async function apiAddOfferList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/offers/create',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export async function apiDeleteOfferList<T>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: `/offers/${data}`,
        method: 'delete',
    })
}

export async function apiPutOffer<T, U extends Record<string, unknown>>(
    data: U
) {

    let offerId = data.get('offerId')
    data.delete('offerId')

    return ApiService.fetchData<T>({
        url: `/offers/${offerId}`,
        method: 'put',
        data,
    })
}