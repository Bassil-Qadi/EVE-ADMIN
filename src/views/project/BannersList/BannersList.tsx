import { useEffect, useState } from 'react'
import ActionBar from './components/ActionBar'
import ProjectListContent from './components/ProjectListContent'
import NewProjectDialog from './components/NewProjectDialog'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import { useAppDispatch } from '@/store'
import { getSaloonsList } from './store'

injectReducer('bannersList', reducer)

const BannersList = () => {
    const dispatch = useAppDispatch()
    const [saloonsList, setSaloonsList] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        const responseData = dispatch(getSaloonsList())
        responseData.then((data: any) => {
            const updatedSaloons = data.payload.map((saloon: any) => {
                return {
                    ...saloon,
                    label: saloon.name,
                    value: saloon.name,
                }
            })
            setSaloonsList(updatedSaloons)
        })
    }

    return (
        <Container className="h-full">
            <ActionBar />
            <ProjectListContent />
            <NewProjectDialog saloons={saloonsList} />
        </Container>
    )
}

export default BannersList
