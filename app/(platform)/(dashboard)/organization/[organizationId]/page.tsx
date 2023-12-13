import { Separator } from '@/components/ui/separator'
import BoardList from './_components/BoardList'
import OrgInfo from './_components/OrgInfo'

const OrganizationIdPage = async () => {
	return (
		<div className='w-full mb-20'>
			<OrgInfo />
			<Separator className='my-4' />
			<div className='px-2'>
				<BoardList />
			</div>
		</div>
	)
}

export default OrganizationIdPage
