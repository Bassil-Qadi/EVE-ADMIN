import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from './components/CustomersTable'
import UsersTable from './components/UsersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from '@/store'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
    return (
        <>
            <CustomerStatistic />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <UsersTable />
                {/* <CustomersTable /> */}
            </AdaptableCard>
        </>
    )
}

export default Customers
