'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization } from '@clerk/nextjs'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'

interface OrgInfoProps {
	isPro?: boolean
}

const OrgInfo = ({ isPro }: OrgInfoProps) => {
	const { organization, isLoaded } = useOrganization()

	if (!isLoaded) {
		return <OrgInfo.Skeleton />
	}

	return (
		<div className='flex gap-4'>
			<div className='w-[50px] h-[50px] relative'>
				<Image
					src={organization?.imageUrl!}
					alt='Organization logo'
					fill
					className='object-cover rounded-md'
				/>
			</div>
			<div className='space-y-1'>
				<p className='text-lg font-bold'>{organization?.name}</p>
				<div className='flex items-center gap-1'>
					<CreditCard className='w-4 h-4' />
					<p className='text-xs font-medium'>{isPro ? 'Pro' : 'Free'}</p>
				</div>
			</div>
		</div>
	)
}
export default OrgInfo

OrgInfo.Skeleton = function SkeletonInfo() {
	return (
		<div className='flex gap-4'>
			<div className='w-[50px] h-[50px] relative'>
				<Skeleton className='w-full h-full rounded-md' />
			</div>
			<div className='flex flex-col justify-center gap-2'>
				<Skeleton className='w-36 h-5' />
				<Skeleton className='w-12 h-3' />
			</div>
		</div>
	)
}
