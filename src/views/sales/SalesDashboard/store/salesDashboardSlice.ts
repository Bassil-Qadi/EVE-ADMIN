import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { apiGetSalesDashboardData, apiGetServicesDashboardData, apiGetSaloonsDashboardData } from '@/services/SalesService'

// type Statistic = {
//     value: number
//     growShrink: number
// }

// export type DashboardData = {
//     data?: {
//         description: string,
//         image: string,
//         name: string,
//     },
//     statisticData?: {
//         revenue: Statistic
//         orders: Statistic
//         purchases: Statistic
//     }
//     salesReportData?: {
//         series: {
//             name: string
//             data: number[]
//         }[]
//         categories: string[]
//     }
//     topProductsData?: {
//         id: string
//         name: string
//         img: string
//         sold: number
//     }[]
//     latestOrderData?: {
//         id: string
//         date: number
//         customer: string
//         status: number
//         paymentMehod: string
//         paymentIdendifier: string
//         totalAmount: number
//     }[]
//     salesByCategoriesData?: {
//         labels: string[]
//         data: number[]
//     }
// }

// type DashboardDataResponse = DashboardData

// export type SalesDashboardState = {
//     startDate: number
//     endDate: number
//     loading: boolean
//     dashboardData: DashboardData,
// }

export const SLICE_NAME = 'salesDashboard'

export const getSalesDashboardData = createAsyncThunk(
    SLICE_NAME + '/getSalesDashboardData',
    async () => {
       try {
        const response = await apiGetSalesDashboardData()
        const serviceResponse = await apiGetServicesDashboardData()
        const saloonsResponse = await apiGetSaloonsDashboardData()

        return {
            categories: response.data.data,
            services: serviceResponse.data.data,
            saloons: saloonsResponse.data.data
        }
       } catch (error) {
        return {
            categories: [],
            services: [],
            saloons: []
        }
       }
    }
)

const initialState = {
    startDate: dayjs(
        dayjs().subtract(3, 'month').format('DD-MMM-YYYY, hh:mm A')
    ).unix(),
    endDate: dayjs(new Date()).unix(),
    loading: true,
    dashboardData: {
        categories: [],
        services: [],
        saloons: []
    },
}

const salesDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStartDate: (state, action: PayloadAction<number>) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action: PayloadAction<number>) => {
            state.endDate = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSalesDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getSalesDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(getSalesDashboardData.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { setStartDate, setEndDate } = salesDashboardSlice.actions

export default salesDashboardSlice.reducer
