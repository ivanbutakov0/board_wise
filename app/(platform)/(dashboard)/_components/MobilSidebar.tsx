'use client'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

const MobilSidebar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	// FIXME: Maybe we should use state manager for menu?????

	// FIXME: Hydration fix

	useEffect(() => {
		setIsOpen(false)
	}, [pathname])

	return (
		<div className='block md:hidden'>
			<Sheet open={isOpen} onOpenChange={() => setIsOpen(current => !current)}>
				<SheetTrigger>
					<Menu />
				</SheetTrigger>
				<SheetContent side={'left'}>
					<SheetHeader>
						<Sidebar storageKey='sidebar-mobile-state' />
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	)
}
export default MobilSidebar
