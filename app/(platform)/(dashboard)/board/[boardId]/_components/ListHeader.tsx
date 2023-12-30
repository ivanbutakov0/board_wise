'use client'

import { updateList } from '@/actions/update-list'
import FormInput from '@/components/form/FormInput'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'

import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import ListOptions from './ListOptions'

interface ListHeaderProps {
	data: List
	onAddCard: () => void
}

const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState(data.title)

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const { execute } = useAction(updateList, {
		onSuccess: data => {
			toast.success(`List "${data.title}" has been renamed!`)
			setTitle(data.title)
			setIsEditing(false)
		},
		onError: error => {
			toast.error(error)
		},
	})

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

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string
		const id = formData.get('id') as string

		if (title === data.title) {
			return disableEditing()
		}

		execute({ title, boardId, id })
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	return (
		<div className='text-sm font-semibold flex justify-between items-center gap-x-2'>
			{isEditing ? (
				<form action={onSubmit} ref={formRef} className='w-full'>
					<input hidden id='id' name='id' value={data.id} />
					<input hidden id='boardId' name='boardId' value={data.boardId} />
					<FormInput
						ref={inputRef}
						onBlur={onBlur}
						id='title'
						defaultValue={title}
						className='text-sm mb-[-8px] font-semibold h-5 border-none focus-visible:outline-none focus-visible:ring-transparent bg-white/70 py-4 shadow-sm'
					/>
					<button type='submit' hidden />
				</form>
			) : (
				<div onClick={enableEditing} className='w-full pl-3 h-5 cursor-pointer'>
					{title}
				</div>
			)}
			<ListOptions onAddCard={onAddCard} data={data} />
		</div>
	)
}
export default ListHeader
