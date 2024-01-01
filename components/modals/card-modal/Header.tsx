'use client'

import FormInput from '@/components/form/FormInput'
import { Skeleton } from '@/components/ui/skeleton'
import { CardWithList } from '@/types'
import { Layout } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'

interface HeaderProps {
	data: CardWithList
}

const Header = ({ data }: HeaderProps) => {
	const [title, setTitle] = useState(data.title)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const onBlur = () => {
		inputRef.current?.form?.requestSubmit()
	}

	const onSubmit = (formData: FormData) => {
		console.log(formData.get('title'))
	}

	return (
		<div className='flex items-start gap-2 pr-4'>
			<Layout className='h-5 w-5 mt-0.5' />
			<div className='w-full'>
				<form action={onSubmit}>
					<FormInput
						ref={inputRef}
						id='title'
						defaultValue={title}
						onBlur={onBlur}
						className='text-lg border-none px-1 h-6 -mb-1'
					/>
				</form>
				<p className='pl-1 text-sm text-muted-foreground'>
					in list <span className='underline'>{data.list.title}</span>
				</p>
			</div>
		</div>
	)
}
export default Header

Header.Skeleton = function HeaderSkeleton() {
	return (
		<div className='flex items-center gap-2'>
			<Skeleton className='h-5 w-5' />
			<div>
				<Skeleton className='h-5 w-full' />
			</div>
		</div>
	)
}
