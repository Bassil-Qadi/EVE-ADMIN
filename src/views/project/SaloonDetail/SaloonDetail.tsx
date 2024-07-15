import { useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Loading from '@/components/shared/Loading'
import Container from '@/components/shared/Container'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import SaloonProfile from './components/SaloonProfile'
import PaymentHistory from './components/PaymentHistory'
import ServicesTable from './components/ServicesTable'
import NewServiceDialog from './components/NewServiceDialog'
import NewProjectDialog from '../CategoryList/components/NewProjectDialog'
// // import CurrentSubscription from './components/CurrentSubscription'
// import PaymentMethods from './components/PaymentMethods'
import reducer, {
    useAppDispatch,
    useAppSelector,
    setSelectedSaloon,
    getSaloon
} from './store'
import { useAppSelector as saloonAppSelector } from '@/views/project/ProjectList/store'

import { injectReducer } from '@/store'
import isEmpty from 'lodash/isEmpty'
import useQuery from '@/utils/hooks/useQuery'
import {
    deleteCategory,
    getCategoryList,
    getSaloonServices,
    getSaloonUsers
} from '../CategoryList/store'

injectReducer('projectSaloonDetails', reducer)

const SaloonDetail = () => {
    const dispatch = useAppDispatch()

    const query = useQuery()

    const data = useAppSelector(
        (state) => state.projectSaloonDetails.data.profileData,
    )
    const saloonsList = saloonAppSelector(
        (state) => state.projectList?.data.saloonsList,
    )
    const loading = useAppSelector(
        (state) => state.projectSaloonDetails?.data.loading,
    )
    const serviceDialogOpen = useAppSelector(
        (state) => state.projectSaloonDetails.data.deleteServiceDialog,
    )
    const saloonStaff = useAppSelector(
        state => state.projectSaloonDetails.data.profileData.saloonStaff
    )
    const saloonCategories = useAppSelector(
        (state) => state.projectSaloonDetails.data.profileData.saloonCategories,
    )
    
    const [saloonServices, setSaloonServices] = useState([])
    const [saloonUsers, setSaloonUsers] = useState([])

    console.log(saloonUsers)

    useEffect(() => {
        fetchSaloonUsers()
        fetchSaloonServices()
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchSaloonUsers = () => {
        if(data?._id) {
            let response = dispatch(getSaloonUsers({ saloonId: data._id }))
            response.then((data) => {
                if(data.error) setSaloonUsers([])
                if (data.payload) {
                    setSaloonUsers(data.payload)
                }
            })
        }
    }

    const fetchSaloonServices = () => {
        if (data?._id) {
            let response = dispatch(getSaloonServices({ saloonId: data._id }))
            response.then((data) => {
                if(data.error) setSaloonServices([])
                if (data.payload) {
                    setSaloonServices(data.payload)
                }
            })
        }
    }

    const fetchData = () => {
        let response = dispatch(getSaloon(query.get('id')))
        response.then((data) => {
            if (data.payload) {
                dispatch(setSelectedSaloon(data.payload.data))
            }
        })
    }
    
    const calcProgressBarValue = () => {
        let filledArrays = 0

        if(data?.saloonCategories.length > 0) filledArrays++
        if(data?.saloonStaff.length > 0) filledArrays++
        if(data?.saloonWork.length > 0) filledArrays++

        let progress = (filledArrays / 3) * 100

        return progress
    }

    return (
        <Container className="h-full">
            <Loading loading={loading}>
                {!isEmpty(data) && (
                    <div className="flex flex-col xl:flex-row gap-4">
                        <div>
                            <SaloonProfile data={data.saloon} value={calcProgressBarValue()} fetchData={fetchData} />
                        </div>
                        <div className="w-full">
                            <AdaptableCard>
                                <PaymentHistory data={data.saloon.workingTime} userId={query.get('id')} />
                                {/* {saloonServices && (
                                    <ServicesTable
                                        data={saloonServices}
                                        userId={query.get('id')}
                                    />
                                )} */}
                            </AdaptableCard>
                        </div>
                    </div>
                )}
            </Loading>
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No user found!"
                    />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
            {/* <NewProjectDialog saloonId={data?._id} fetchData={fetchData} /> */}
            {/* <NewServiceDialog
                saloonStaff={saloonStaff}
                saloonCategories={saloonCategories}
                fetchData={fetchSaloonServices}
            /> */}
        </Container>
    )
}

export default SaloonDetail
