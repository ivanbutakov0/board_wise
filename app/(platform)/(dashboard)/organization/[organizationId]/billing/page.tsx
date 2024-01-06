import ComingSoon from '@/components/ComingSoon'
import { Separator } from '@/components/ui/separator'
import OrgInfo from '../_components/OrgInfo'

const BillingPage = () => {
	return (
		<div className='w-full'>
			<OrgInfo />
			<Separator className='my-4' />
			<ComingSoon />
		</div>
	)
}
export default BillingPage
