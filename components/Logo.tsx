import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href='/' className='flex items-center gap-2'>
			<Image src='/logo.png' alt='' width={28} height={28}></Image>
			<p className='max-sm:hidden font-heading text-xl'>BoardWise</p>
		</Link>
	)
}
export default Logo
