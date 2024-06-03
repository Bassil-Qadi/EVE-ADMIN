import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCategoryList,
    apiPutProjectList,
    apiAddCategoryList,
    apiDeleteCategoryList
} from '@/services/ProjectService'

type Category = {
    _id: string,
    name: string,
    description: string,
    image: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string
}

type CategoryList = Category[]

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}

type GetCategoryListRequest = Query

type GetCategoryListResponse = CategoryList

type AddCategoryListRequest = {
    id?: string | undefined
    name: string
    description: string
    file: File
}

type PutProjectListRequest = {
    id?: string | undefined
    name: string
    description: string
    file: string
}

export type AddCategoryListResponse = CategoryList


export type ProjectListState = {
    loading: boolean
    categoriesList: CategoryList,
    view: 'grid' | 'list'
    query: Query
    newProjectDialog: boolean,
    deleteCategoryDialog: boolean
    deletedCategoryId: string
}

export const SLICE_NAME = 'categoryList'

export const getCategoryList = createAsyncThunk(
    SLICE_NAME + '/getList',
    async () => {
        const response = await apiGetCategoryList<
            GetCategoryListResponse,
            GetCategoryListRequest
        >()

        return response.data.data
    }
)

export const addCategory = createAsyncThunk(
    SLICE_NAME + '/addCategory',
    async (data: any) => {
        const response = await apiAddCategoryList<
            AddCategoryListResponse,
            AddCategoryListRequest
        >(data)
        return response.data
    }
)

export const deleteCategory = createAsyncThunk(
    SLICE_NAME + '/deleteCategory',
    async (data: any) => {
        const response = await apiDeleteCategoryList<any>(data)
        return response.data
    }
)

export const putProject = createAsyncThunk(
    SLICE_NAME + '/putProject',
    async (data: PutProjectListRequest) => {
        const response = await apiPutProjectList<
            AddCategoryListResponse,
            PutProjectListRequest
        >(data)
        return response.data
    }
)

const initialState: ProjectListState = {
    loading: false,
    categoriesList: [],
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    },
    newProjectDialog: false,
    deleteCategoryDialog: false,
    deletedCategoryId: ''
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
        toggleNewProjectDialog: (state, action) => {
            state.newProjectDialog = action.payload
        },
        toggleDeleteCategoryDialog: (state, action) => {
            state.deleteCategoryDialog = action.payload
        },
        setDeletedCategoryId: (state, action) => {
            state.deletedCategoryId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.fulfilled, (state, action) => {
                state.categoriesList = action.payload
                state.loading = false
            })
            .addCase(getCategoryList.pending, (state) => {
                state.loading = true
            })
            // .addCase(putProject.fulfilled, (state, action) => {
            //     state.projectList = action.payload
            // })
    },
})

export const { toggleView, toggleSort, toggleNewProjectDialog, toggleDeleteCategoryDialog, setSearch, setDeletedCategoryId } =
categoryListSlice.actions

export default categoryListSlice.reducer
