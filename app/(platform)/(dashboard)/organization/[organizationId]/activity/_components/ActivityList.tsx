import Pagination from '@/components/Pagination/Pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const ActivityList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		redirect('/select-org')
	}

	const auditLists = await prisma.auditLog.findMany({
		where: {
			orgId: orgId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<div>
			<p className='hidden last:block text-center text-muted-foreground'>
				No activity found inside this organization
			</p>
			<Pagination data={auditLists} itemsPerPage={12} />
		</div>
	)
}
export default ActivityList

ActivityList.Skeleton = function ActivityListSkeleton() {
	return (
		<ol className='space-y-4 mt-4'>
			<Skeleton className='h-14 w-80%' />
			<Skeleton className='h-14 w-80%' />
			<Skeleton className='h-14 w-80%' />
			<Skeleton className='h-14 w-80%' />
			<Skeleton className='h-14 w-80%' />
		</ol>
	)
}
