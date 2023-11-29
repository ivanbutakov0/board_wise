import Navbar from '@/app/(marketing)/_components/Navbar'
import Footer from './_components/Footer'

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section className='h-screen bg-slate-100 flex flex-col'>
			<Navbar />
			<main className='flex-1 pt-40 pb-20 px-3 bg-slate-100'>{children}</main>
			<Footer />
		</section>
	)
}
