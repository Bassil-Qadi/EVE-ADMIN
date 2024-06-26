import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Articles from './components/Articles'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('knowledgeBaseManagePages', reducer)

const ManageFAQs = () => {
    return (
        <Container>
            <AdaptableCard>
                <Articles />
            </AdaptableCard>
        </Container>
    )
}

export default ManageFAQs
