'use client'

import generateLogMessage from '@/lib/generate-log-message'
import { AuditLog } from '@prisma/client'
import { format } from 'date-fns'
import { Avatar, AvatarImage } from './ui/avatar'

interface ActivityItemProps {
	data: AuditLog
}

const ActivityItem = ({ data }: ActivityItemProps) => {
	return (
		<li className='flex gap-2 items-center'>
			<Avatar className='w-8 h-8'>
				<AvatarImage src={data.userImage} />
			</Avatar>
			<div className='flex flex-col space-y-0.5'>
				<p className='text-sm text-muted-foreground'>
					<span className='font-semibold lowercase text-neutral-700 pr-2'>
						{data.userName}
					</span>
					{generateLogMessage(data)}
				</p>
				<p className='text-xs text-muted-foreground'>
					{format(new Date(data.createdAt), "dd MMM yyyy 'at' hh:mm")}
				</p>
			</div>
		</li>
	)
}
export default ActivityItem
