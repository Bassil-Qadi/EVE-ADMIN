import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetBannersList,
    apiPutProjectList,
    apiAddBannerList,
    apiDeleteBannerList,
    apiPutBanner,
    apiGetOffersList,
    apiAddOfferList,
    apiDeleteOfferList,
    apiPutOffer
} from '@/services/ProjectService'

type Banner = {
    _id: string
    title: string
    description: string
    image: string
    saloonId: string
    userId: string
    status: string
}

type BannersList = Banner[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetBannersListRequest = Query

type GetBannersListResponse = BannersList

type AddCategoryListRequest = {
    title: string
    description: string
    saloonId?: string
    userId?: string
    image: string
    status: string
}

type PutProjectListRequest = {
    id?: string | undefined
    name: string
    description: string
    file: string
}

export type AddCategoryListResponse = BannersList

type Filter = {
    selectedSaloon: string
}

export type ProjectListState = {
    loading: boolean
    bannersList: BannersList
    view: 'grid' | 'list'
    query: Query
    filterData: Filter
    newBannerDialog: boolean
    deleteBannerDialog: boolean
    editBannerdialog: boolean
    selectedBanner: Banner
    deletedBannerId: string
}

export const SLICE_NAME = 'bannersList'

export const getOffersList = createAsyncThunk(
    SLICE_NAME + '/getList',
    async (data: any) => {
        const response = await apiGetOffersList(data.saloonId)

        return response.data.data
    },
)

export const addOffer = createAsyncThunk(
    SLICE_NAME + '/addOffer',
    async (data: any) => {
        const response = await apiAddOfferList<
            AddCategoryListResponse,
            AddCategoryListRequest
        >(data)
        return response.data
    },
)

export const deleteOffer = createAsyncThunk(
    SLICE_NAME + '/deleteOffer',
    async (data: any) => {
        const response = await apiDeleteOfferList<any>(data)
        return response.data
    },
)

export const putOffer = createAsyncThunk(
    SLICE_NAME + '/putOffer',
    async (data: any) => {
        const response = await apiPutOffer(data)
        return response.data
    },
)

export const initialFilterData = {
    selectedSaloon: "",
}

const initialState: ProjectListState = {
    loading: false,
    bannersList: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    newBannerDialog: false,
    deleteBannerDialog: false,
    editBannerdialog: false,
    filterData: initialFilterData,
    selectedBanner: {
        _id: '',
        title: '',
        description: '',
        image: '',
        saloonId: '',
        userId: '',
        status: ''
    },
    deletedBannerId: '',
}

const categoryListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        toggleView: (state, action) => {
            state.view = action.payload
        },
        toggleSort: (state, action) => {
            state.query.sort = action.payload
        },
        setSearch: (state, action) => {
            state.query.search = action.payload
        },
        toggleNewBannerDialog: (state, action) => {
            state.newBannerDialog = action.payload
        },
        toggleDeleteBannerDialog: (state, action) => {
            state.deleteBannerDialog = action.payload
        },
        toggleEditBannerDialog: (state, action) => {
            state.editBannerdialog = action.payload
        },
        setSelectedBanner: (state, action) => {
            state.selectedBanner = action.payload
        },
        setDeletedBannerId: (state, action) => {
            state.deletedBannerId = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOffersList.fulfilled, (state, action) => {
                state.bannersList = action.payload
                state.loading = false
            })
            .addCase(getOffersList.pending, (state) => {
                state.loading = true
            })
            .addCase(getOffersList.rejected, (state) => {
                state.loading = false
            })
            .addCase(addOffer.pending, (state) => {
                state.loading = true
            })
            .addCase(addOffer.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(addOffer.rejected, (state) => {
                state.loading = false
            })
            .addCase(deleteOffer.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteOffer.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(deleteOffer.rejected, (state) => {
                state.loading = false
            })
            .addCase(putOffer.pending, (state) => {
                state.loading = true
            })
            .addCase(putOffer.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(putOffer.rejected, (state) => {
                state.loading = false
            })
        // .addCase(putProject.fulfilled, (state, action) => {
        //     state.projectList = action.payload
        // })
    },
})

export const {
    toggleView,
    toggleSort,
    toggleNewBannerDialog,
    toggleDeleteBannerDialog,
    setSearch,
    setDeletedBannerId,
    setSelectedBanner,
    toggleEditBannerDialog,
    setFilterData
} = categoryListSlice.actions

export default categoryListSlice.reducer
