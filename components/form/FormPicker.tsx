'use client'

import { defaultImages } from '@/constants/images'
import { unsplash } from '@/lib/unsplash'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import FormErrors from './FormErrors'

interface FormPickerProps {
	id: string
	errors?: Record<string, string[] | undefined>
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
	const { pending } = useFormStatus()

	const [images, setImages] = useState<Array<Record<string, any>>>([])
	const [isLoading, setIsLoading] = useState(true)
	const [selectedImageId, setSelectedImageId] = useState(null)

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
			<div className='flex items-center justify-center'>
				<Loader2 className='animate-spin' />
			</div>
		)
	}

	return (
		<div>
			<div className='grid grid-cols-3 gap-2 mb-4'>
				{images.map(image => (
					<div
						key={image.id}
						className={`relative cursor-pointer aspect-video group hover:opacity-75 transition bg-muted ${
							pending && 'opacity-50 hover:opacity-50 cursor-auto'
						}`}
						onClick={() => {
							if (pending) return
							setSelectedImageId(image.id)
						}}
					>
						<input
							type='checkbox'
							name={id}
							id={id}
							className='hidden'
							checked={image.id === selectedImageId}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.user.links.html}|${image.user.name}`}
						/>
						<Image
							src={image.urls.thumb}
							alt='image'
							fill
							className='object-cover rounded-sm'
						/>
						{selectedImageId === image.id && (
							<div className='absolute inset-y-0 w-full h-full bg-black/40 flex items-center justify-center rounded-sm'>
								<Check className='w-4 h-4 text-white' />
							</div>
						)}
						<Link
							href={image.links.html}
							target='_blank'
							className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
						>
							{image.user.name}
						</Link>
					</div>
				))}
			</div>
			<FormErrors errors={errors} id={id} />
		</div>
	)
}
export default FormPicker
