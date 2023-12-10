'use client'

import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import FormInput from './FormInput'

const Form = () => {
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
		<form action={onSubmit} className='flex gap-4'>
			<FormInput errors={fieldErrors} />
		</form>
	)
}
export default Form
