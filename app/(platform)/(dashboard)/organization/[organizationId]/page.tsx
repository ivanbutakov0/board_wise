import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'
import BoardList from './_components/BoardList'
import OrgInfo from './_components/OrgInfo'

const OrganizationIdPage = async () => {
	return (
		<div className='w-full mb-20'>
			<OrgInfo />
			<Separator className='my-4' />
			<div className='px-2'>
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList />
				</Suspense>
			</div>
		</div>
	)
}

export default OrganizationIdPage
