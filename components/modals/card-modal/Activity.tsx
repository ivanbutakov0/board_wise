'use client'

import ActivityItem from '@/components/ActivityItem'
import { Skeleton } from '@/components/ui/skeleton'
import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'

interface ActivityProps {
	items: AuditLog[]
}

const Activity = ({ items }: ActivityProps) => {
	return (
		<div className='flex items-start gap-x-3 w-full pr-4'>
			<ActivityIcon className='h-5 w-5 mt-0.5' />
			<div className='w-full flex flex-col gap-2'>
				<p className='font-semibold'>Activity</p>
				<ol>
					{items.map(item => (
						<ActivityItem key={item.id} data={item} />
					))}
				</ol>
			</div>
		</div>
	)
}
export default Activity

Activity.Skeleton = function ActivitySkeleton() {
	return (
		<div className='flex items-start gap-x-3 w-full pr-4'>
			<Skeleton className='h-5 w-5' />
			<div className='w-full flex flex-col gap-2'>
				<Skeleton className='h-5 w-24' />
				<Skeleton className='h-9 w-full' />
				<Skeleton className='h-9 w-full' />
				<Skeleton className='h-9 w-full' />
			</div>
		</div>
	)
}
