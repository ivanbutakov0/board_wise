import Navbar from './_components/Navbar'

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className='h-full'>
			<Navbar />
			{children}
		</section>
	)
}

export default dashboardLayout
