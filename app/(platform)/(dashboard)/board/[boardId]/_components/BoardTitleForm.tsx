'use client'

import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'

interface BoardTitleFormProps {
	data: Board
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState(data.title)
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const handleClick = () => {
		setIsEditing(true)

		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const onSubmit = (formData: FormData) => {
		const newTitle = formData.get('title') as string
		setTitle(newTitle)

		setIsEditing(false)
	}

	if (isEditing) {
		return (
			<form
				action={onSubmit}
				ref={formRef}
				className='flex items-center gap-x-2 font-bold text-lg'
			>
				<FormInput
					ref={inputRef}
					id='title'
					defaultValue={title}
					className='text-lg font-bold px-[7px] pb-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
				/>
			</form>
		)
	}

	return (
		<Button
			onClick={handleClick}
			className='font-bold text-lg h-auto w-auto p-1 px-2 bg-transparent hover:bg-slate-50/10'
		>
			{title}
		</Button>
	)
}
export default BoardTitleForm
