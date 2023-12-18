import Logo from '@/components/Logo'
import FormPopover from '@/components/form/FormPopover'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import MobilSidebar from './MobilSidebar'

const Navbar = () => {
	return (
		<nav className='fixed z-10 px-4 w-full py-2 border-b shadow-sm bg-white flex items-center justify-between'>
			<div className='flex gap-8 items-center'>
				<MobilSidebar />

				<div className='hidden items-center md:flex'>
					<Logo />
				</div>
				<FormPopover align='start' side='bottom' sideOffset={10}>
					<Button size='sm' className='py-0 px-3'>
						<p className='hidden sm:block'>Create</p>
						<Plus className='sm:hidden' />
					</Button>
				</FormPopover>
			</div>
			<div className='flex gap-3 items-center'>
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl='/organization/:id'
					afterSelectOrganizationUrl='/organization/:id'
					afterLeaveOrganizationUrl='/select-org'
					appearance={{
						elements: {
							rootBox: {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							},
						},
					}}
				/>

				<UserButton
					afterSignOutUrl='/'
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30,
							},
						},
					}}
				/>
			</div>
		</nav>
	)
}
export default Navbar
