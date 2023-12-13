'use client'

import { createBoard } from '@/actions/create-board'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'

interface FormPopoverProps {
	children: React.ReactNode
	side?: 'top' | 'right' | 'bottom' | 'left'
	sideOffset?: number
	align?: 'start' | 'center' | 'end'
}

const FormPopover = ({
	children,
	side = 'bottom',
	sideOffset,
	align,
}: FormPopoverProps) => {
	const router = useRouter()
	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: data => {
			toast.success('Board created successfully')
			closeRef.current?.click()
			//router.push(`/board/${data.id}`)
		},
		onError: error => {
			toast.error(error)
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const image = formData.get('image') as string

		execute({ title })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				side={side}
				sideOffset={sideOffset}
				align={align}
				className='w-80'
			>
				<div className='text-sm text-center pb-4 font-medium'>Create board</div>
				<PopoverClose ref={closeRef} asChild>
					<Button
						variant='ghost'
						className='absolute top-3 right-3 outline-none p-0 w-5 h-5'
					>
						<X className='w-4 h-4' />
					</Button>
				</PopoverClose>
				<form action={onSubmit} className='space-y-2'>
					<FormInput
						id='title'
						placeholder='Enter board title'
						label='Board title'
						errors={fieldErrors}
					/>
					<FormSubmit className='w-full' variant='default'>
						Create
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
export default FormPopover
