import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const FormPicker = () => {
	const [images, setImages] = useState<Array<Record<string, any>>>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const result = await unsplash.photos.getRandom({
					collectionIds: ['317099'],
					count: 9,
				})

				if (result && result.response) {
					const newImages = result.response as Array<Record<string, any>>
					setImages(newImages)
				} else {
					console.error('Failed to fetch images')
				}
			} catch (err) {
				console.log(err)
				setImages(defaultImages)
			} finally {
				setIsLoading(false)
			}
		}

		fetchImages()
	}, [])

	if (isLoading) {
		return (
			<div>
				<Loader2 />
			</div>
		)
	}

	return (
		<div>
			<div className='grid grid-cols-3 gap-2'>
				{images.map(image => (
					<div key={image.id} className='relative '>
						<Image
							src={image.urls.thumb}
							alt='image'
							fill
							className='object-cover rounded-sm'
						/>
					</div>
				))}
			</div>
		</div>
	)
}
export default FormPicker
