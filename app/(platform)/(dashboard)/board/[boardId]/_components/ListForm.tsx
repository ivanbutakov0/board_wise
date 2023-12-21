'use client'

import { createList } from '@/actions/create-list'
import FormInput from '@/components/form/FormInput'
import FormSubmit from '@/components/form/FormSubmit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Plus, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import ListWrapper from './ListWrapper'

const ListForm = () => {
	const [isEditing, setIsEditing] = useState(false)
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)
	const params = useParams()
	const router = useRouter()

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: data => {
			toast.success(`List ${data.title} created!`)
			disableEditing()
			router.refresh()
		},
		onError: error => {
			toast.error(error)
		},
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string

		execute({ title, boardId })

		disableEditing()
	}

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					ref={formRef}
					action={onSubmit}
					className='w-full p-3 bg-white rounded-md shadow-md space-y-4'
				>
					<FormInput
						ref={inputRef}
						errors={fieldErrors}
						id='title'
						className='text-sm font-medium px-2 py-1 h-7 border-transparent hover:border-input focus:border-input transition'
						placeholder='Enter list title...'
					/>
					<input hidden value={params.boardId} name='boardId' />

					<div className='flex justify-between items-center gap-2'>
						<FormSubmit variant='default'>Add list</FormSubmit>
						<Button size='sm' variant='ghost' onClick={disableEditing}>
							<X />
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				className='w-full bg-white/80 hover:bg-white/60 px-4 py-2 flex items-center gap-2 rounded-sm font-semibold'
				onClick={enableEditing}
			>
				<Plus />
				Add new list
			</button>
		</ListWrapper>
	)
}
export default ListForm
