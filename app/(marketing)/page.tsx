import { Button } from '@/components/ui/button'
import { Medal } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
	return (
		<section className='flex flex-col gap-10 items-center'>
			<div className='flex gap-3 px-5 py-3 font-bold text-amber-600 bg-amber-100 rounded-full'>
				<Medal />
				<p>NO 1 TASK MANAGEMENT</p>
			</div>
			<h1 className='text-center flex flex-col gap-2 items-center text-4xl font-bold font-heading'>
				BoardWise helps team move
				<div className='px-5 rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white'>
					work forward
				</div>
			</h1>
			<p className='max-w-lg text-center text-gray-500 px-2 font-poppins'>
				Collaborate, manage projects, and reach new productivity peaks. From
				high rises to the home office, the way your team works is unique -
				accomplish it all with BoardWise.
			</p>
			<Button asChild>
				<Link href='/sign-in'>Get BoardWise for free</Link>
			</Button>
		</section>
	)
}
export default Page
