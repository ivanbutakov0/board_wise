'use client'

import { updateCard } from '@/actions/update-card'
import FormInput from '@/components/form/FormInput'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

interface HeaderProps {
	data: CardWithList
}

const Header = ({ data }: HeaderProps) => {
	const [title, setTitle] = useState(data.title)
	const params = useParams()
	const inputRef = useRef<ElementRef<'input'>>(null)
	const queryClient = useQueryClient()

	const { execute } = useAction(updateCard, {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['card', data.id],
			})

			toast.success('Card has been updated!')
			setTitle(data.title)
		},
		onError: () => {
			toast.error('Something went wrong!')
		},
	})

	const onBlur = () => {
		inputRef.current?.form?.requestSubmit()
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = params.boardId as string

		if (title === data.title) return

		execute({ id: data.id, title, boardId })
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
		<div className='flex items-start gap-2 pr-4'>
			<Skeleton className='h-5 w-5' />
			<div className='flex flex-col gap-2 w-full'>
				<Skeleton className='h-5 w-full' />
				<Skeleton className='h-4 w-[100px]' />
			</div>
		</div>
	)
}
