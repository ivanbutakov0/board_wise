import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { Activity, Layout, Receipt, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface Organization {
	id: string
	name: string
	imageUrl: string
}

interface ItemProps {
	organization: Organization
	onExpand: (id: string) => void
	isActive: boolean
	isExpanded: boolean
}

const OrganizationNavItem = ({
	organization,
	onExpand,
	isActive,
	isExpanded,
}: ItemProps) => {
	const OrganizationContentList = [
		{
			icon: <Layout className='h-4 w-4' />,
			title: 'Boards',
			link: `/organization/${organization.id}`,
		},
		{
			icon: <Activity className='h-4 w-4' />,
			title: 'Activity',
			link: `/organization/${organization.id}/activity`,
		},
		{
			icon: <Settings className='h-4 w-4' />,
			title: 'Settings',
			link: `/organization/${organization.id}/settings`,
		},
		{
			icon: <Receipt className='h-4 w-4' />,
			title: 'Billing',
			link: `/organization/${organization.id}/billing`,
		},
	]

	const pathname = usePathname()
	return (
		<AccordionItem
			className='border-none underline-offset-0'
			value={organization.id}
			key={organization.id}
		>
			<AccordionTrigger
				className={`${
					isActive && !isExpanded ? 'bg-blue-100' : 'hover:bg-slate-100'
				} hover:no-underline py-2 px-2 rounded-xl mb-1`}
				onClick={() => onExpand(organization.id)}
			>
				<div className='flex gap-2 items-center'>
					<Image
						src={organization.imageUrl}
						alt='organization logo'
						width={28}
						height={28}
						className='rounded-sm'
					/>
					<p className='text-sm font-semibold'>{organization.name}</p>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				{OrganizationContentList.map(item => (
					<Link
						key={item.title}
						href={item.link}
						className={`${
							pathname === item.link ? 'bg-blue-100' : 'hover:bg-slate-100'
						} flex gap-2 items-center p-2 ml-5 rounded-md mb-1 last:mb-0`}
					>
						{item.icon}
						{item.title}
					</Link>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}
export default OrganizationNavItem

OrganizationNavItem.Skeleton = function SkeletonOrganizationNavItem() {
	return (
		<div className='flex items-center gap-x-2'>
			<div className='w-10 h-10 relative shrink-0'>
				<Skeleton className='w-full h-full absolute' />
			</div>
			<Skeleton className='w-full h-10' />
		</div>
	)
}
