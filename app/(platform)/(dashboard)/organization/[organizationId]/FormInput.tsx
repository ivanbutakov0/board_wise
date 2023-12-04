import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

interface Props {
	errors?: {
		title?: string[]
	}
}

const FormInput = ({ errors }: Props) => {
	const { pending } = useFormStatus()
	return (
		<>
			<div>
				<input
					disabled={pending}
					className='border-black border'
					id='title'
					name='title'
					placeholder='Enter a board title'
				/>
				{errors?.title && <p className='text-red-500'>{errors.title}</p>}
			</div>
			<Button disabled={pending} type='submit'>
				{pending ? 'Loading...' : 'Create'}
			</Button>
		</>
	)
}
export default FormInput
