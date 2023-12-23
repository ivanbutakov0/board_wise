import { forwardRef } from 'react'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import FormErrors from './FormErrors'

interface FormTextareaProps {
	onBlur: () => void
	id: string
	placeholder: string
	className?: string
	label?: string
	errors?: Record<string, string[] | undefined>
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
	({ onBlur, id, placeholder, className, label, errors }, ref) => {
		return (
			<div className='w-full space-y-1'>
				{label ? (
					<Label
						htmlFor={id}
						className='text-xs font-semibold text-neutral-700 ml-2'
					>
						{label}
					</Label>
				) : null}
				<Textarea
					ref={ref}
					id={id}
					placeholder={placeholder}
					onBlur={onBlur}
					className={`resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm ${className}`}
				/>
				<FormErrors id={id} errors={errors} />
			</div>
		)
	}
)
export default FormTextarea
