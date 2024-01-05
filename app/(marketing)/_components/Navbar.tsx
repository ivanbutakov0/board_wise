import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className='fixed top-0 w-full px-5 py-2  border-y shadow-sm bg-white'>
			<div className='max-w-7xl mx-auto flex items-center justify-between'>
				<Logo />
				<div className='flex gap-2'>
					<Button
						className='hidden md:flex'
						size='sm'
						variant='outline'
						asChild
					>
						<Link href='/sign-in'>Login</Link>
					</Button>
					<Button className='max-sm:text-xs' size='sm'>
						<Link href='/sign-up'>Get BoardWise for free</Link>
					</Button>
				</div>
			</div>
		</nav>
	)
}
export default Navbar
