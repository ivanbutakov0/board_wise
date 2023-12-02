'use client'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useLocalStorage } from 'usehooks-ts'
import OrganizationNavItem from './OrganizationNavItem'

interface SidebarProps {
	storageKey?: string
}

const Sidebar = ({ storageKey = 'sidebar-state' }: SidebarProps) => {
	const [sidebarOpen, setSidebarOpen] = useLocalStorage<Record<string, any>>(
		storageKey,
		{}
	)

	const { isLoaded: isLoadedOrg, organization: activeOrganization } =
		useOrganization()

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	})

	const defaultAccordionValue: string[] = Object.keys(sidebarOpen).reduce(
		(acc: string[], key: string) => {
			if (sidebarOpen[key]) {
				acc.push(key)
			}

			return acc
		},
		[]
	)

	const onExpand = (id: string) => {
		setSidebarOpen(current => ({
			...current,
			[id]: !sidebarOpen[id],
		}))
	}

	if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
		return (
			<>
				<div className='flex justify-between items-center mb-2'>
					<Skeleton className='h-8 w-[50%]' />
					<Skeleton className='h-8 w-8' />
				</div>
				<div className='space-y-2'>
					<OrganizationNavItem.Skeleton />
					<OrganizationNavItem.Skeleton />
					<OrganizationNavItem.Skeleton />
				</div>
			</>
		)
	}

	return (
		<>
			<div className='font-semibold  text-xs mb-1 justify-between flex items-center'>
				<span className='pl-4'>Workspaces</span>
				<Button type='button' size='icon' variant='ghost'>
					<Link href='/select-org'>
						<Plus className='h-4 w-4' />
					</Link>
				</Button>
			</div>
			<div>
				<Accordion type='multiple' defaultValue={defaultAccordionValue}>
					{userMemberships.data?.map(({ organization }) => (
						<OrganizationNavItem
							key={organization.id}
							organization={organization}
							onExpand={onExpand}
							isActive={activeOrganization?.id === organization.id}
							isExpanded={sidebarOpen[organization.id]}
						/>
					))}
				</Accordion>
			</div>
		</>
	)
}
export default Sidebar
