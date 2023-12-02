import { OrganizationProfile } from '@clerk/nextjs'

const SettingsPage = () => {
	return (
		<div className='w-full'>
			<OrganizationProfile
				appearance={{
					elements: {
						rootBox: {
							width: '100%',
						},
						card: {
							boxShadow: 'none',
							border: '1px solid rgba(0, 0, 0, 0.16)',
							width: '100%',
						},
					},
				}}
			/>
		</div>
	)
}
export default SettingsPage
