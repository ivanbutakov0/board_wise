'use client'

import { createBoard } from '@/actions/create-board'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { useFormStatus } from 'react-dom'

const Form = () => {
	const { pending } = useFormStatus()
	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: data => {
			console.log(data, 'Success!')
		},
		onError: error => {
			console.log(error)
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string

		execute({ title })
	}

	return (
		<form action={onSubmit} className='flex flex-col mb-2'>
			<FormInput
				className=''
				placeholder='Title'
				id='title'
				errors={fieldErrors}
				label='Board title'
			/>
			<Button disabled={pending} type='submit' size='sm'>
				{pending ? 'Saving...' : 'Save'}
			</Button>
		</form>
	)
}
export default Form
