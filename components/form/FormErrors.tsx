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
		<div id={`${id} error`} aria-live='polite' className=''>
			{errors?.[id]?.map((error: string) => (
				<div
					className='flex gap-2 items-center border-2 border-red-500 rounded-lg text-red-500 text-sm font-semibold bg-red-100 px-3 py-2 w-full'
					key={error}
				>
					<XCircle className='h-4 w-4' />
					{error}
				</div>
			))}
		</div>
	)
}
export default FormErrors
