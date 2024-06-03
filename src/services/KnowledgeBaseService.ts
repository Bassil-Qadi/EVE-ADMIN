import ApiService from './ApiService'

export async function apiGetCategoriesData<T>() {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/categories',
        method: 'get',
    })
}

export async function apiQueryArticleList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/articles-query',
        method: 'post',
        data,
    })
}

export async function apiGetArticle<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/article',
        method: 'get',
        params,
    })
}

export async function apiPostArticle<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/article',
        method: 'post',
        data,
    })
}

export async function apiAddFAQ<T>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: '/faq/create',
        method: 'post',
        data,
    })
}

export async function apiUpdateFAQ<T>(
    data: any
) {
    let id = data.id
    data = {...data, ["id"]: undefined}
    return ApiService.fetchData<T>({
        url: `/faq/${id}`,
        method: 'put',
        data,
    })
}

export async function apiGetOthersArticleList<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/others-article',
        method: 'get',
        params,
    })
}

export async function apiGetCategorizedArticles<T>() {
    return ApiService.fetchData<T>({
        url: '/knowledge-base/categorized-articles',
        method: 'get',
    })
}

export async function apiGetFAQs<T>() {
    return ApiService.fetchData<T>({
        url: '/faq',
        method: 'get',
    })
}


export async function apiDeleteFAQ<T>(
    data: any
) {
    return ApiService.fetchData<T>({
        url: `/faq/${data}`,
        method: 'delete',
    })
}