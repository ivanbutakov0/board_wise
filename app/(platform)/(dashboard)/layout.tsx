import Navbar from './_components/Navbar'

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section>
			<Navbar />
			{children}
		</section>
	)
}

export default dashboardLayout
