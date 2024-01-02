'use client'

import { updateCard } from '@/actions/update-card'
import FormSubmit from '@/components/form/FormSubmit'
import FormTextarea from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface DescriptionProps {
	data: CardWithList
}

const Description = ({ data }: DescriptionProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const params = useParams()

	const queryClient = useQueryClient()

	const formRef = useRef<ElementRef<'form'>>(null)
	const textareaRef = useRef<ElementRef<'textarea'>>(null)

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['card', data.id],
			})

			toast.success('Card has been updated!')
			disableEditing()
		},
		onError: () => {
			toast.error('Something went wrong!')
		},
	})

	const enableEditing = () => {
		setIsEditing(true)

		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onSubmit = (formData: FormData) => {
		const description = formData.get('description') as string
		const boardId = params.boardId as string

		execute({ id: data.id, description, boardId })
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	return (
		<div className='flex items-start gap-x-3 w-full pr-4'>
			<AlignLeft className='h-5 w-5 mt-0.5' />
			<div className='w-full flex flex-col gap-2'>
				<p className='font-semibold'>Description</p>
				{isEditing ? (
					<form ref={formRef} action={onSubmit} className='flex gap-2 w-full'>
						<FormTextarea
							id='description'
							ref={textareaRef}
							placeholder='Add a more detailed description...'
							errors={fieldErrors}
							className='flex-1 min-h-[88px] font-medium'
						/>
						<div className='flex flex-col gap-2'>
							<FormSubmit variant='default'>Save</FormSubmit>
							<Button
								type='button'
								variant='secondary'
								onClick={disableEditing}
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						role='button'
						onClick={enableEditing}
						className='min-h-[88px] bg-neutral-200 hover:bg-neutral-300 rounded-md p-2 px-3 text-sm font-semibold'
					>
						{data.description || 'Add a more detailed description...'}
					</div>
				)}
			</div>
		</div>
	)
}
export default Description

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className='flex items-start gap-x-3 w-full pr-4'>
			<Skeleton className='h-5 w-5' />
			<div className='w-full flex flex-col gap-2'>
				<Skeleton className='h-5 w-28' />
				<Skeleton className='min-h-[88px] w-full' />
			</div>
		</div>
	)
}
