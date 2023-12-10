import { XCircle } from 'lucide-react'

interface FormErrorsProps {
	errors?: Record<string, string[] | undefined>
	id: string
}

const FormErrors = ({ errors, id }: FormErrorsProps) => {
	if (!errors) {
		return null
	}
	return (
		<div className='border-2 border-red-500 rounded-lg text-red-500 text-sm font-semibold bg-red-100 px-3 py-2 w-full'>
			{errors?.[id]?.map(error => (
				<p className='flex gap-2 items-center' key={error}>
					<XCircle />
					{error}
				</p>
			))}
		</div>
	)
}
export default FormErrors
