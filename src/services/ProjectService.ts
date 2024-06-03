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
        url: '/categories',
        method: 'get',
    })
}

export async function apiGetProjectList<T, U extends Record<string, unknown>>(
    
) {
    return ApiService.fetchData<T>({
        url: '/all-saloons',
        method: 'get',
    })
}

export async function apiAddCategoryList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categories/create',
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
        url: `/categories/${data}`,
        method: 'delete',
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

export async function apiAddBannerList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/banners/create',
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
        url: '/banners',
        method: 'get',
    })
}


export async function apiDeleteBannerList<T>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: `/banners/${data}`,
        method: 'delete',
    })
}