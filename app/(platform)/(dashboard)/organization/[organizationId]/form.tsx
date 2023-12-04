'use client'

import { createBoard } from '@/actions/create-board'
import { useFormState } from 'react-dom'
import FormInput from './FormInput'

const Form = () => {
	const initialState = {
		message: '',
		errors: {},
	}
	const [state, formAction] = useFormState(createBoard, initialState)

	return (
		<form action={formAction} className='flex gap-4'>
			<FormInput errors={state?.errors} />
		</form>
	)
}
export default Form
