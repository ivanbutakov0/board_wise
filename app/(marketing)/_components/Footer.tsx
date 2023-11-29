import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

const Footer = () => {
	return (
		<nav className='w-full px-3 py-2  border-t bg-white'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				<div className='max-md:hidden'>
					<Logo />
				</div>
				<div className='flex gap-2 md:w-auto items-center justify-between w-full'>
					<Button className='font-semibold' size='sm' variant='ghost'>
						Privacy Policy
					</Button>
					<Button className='font-semibold' variant='ghost' size='sm'>
						Terms of Service
					</Button>
				</div>
			</div>
		</nav>
	)
}
export default Footer
