import React from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import FormErrors from './FormErrors'

interface FormInputProps {
	errors?: Record<string, string[] | undefined>
	id: string
	placeholder?: string
	disabled?: boolean
	label?: string
	className?: string
	defaultValue?: string
	onBlur?: () => void
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			errors,
			id,
			placeholder,
			disabled,
			label,
			className,
			defaultValue,
			onBlur,
		},
		ref
	) => {
		const { pending } = useFormStatus()

		return (
			<div className='flex flex-col gap-2 mb-2'>
				<div className='space-y-2'>
					{label && (
						<Label className='font-bold capitalize text-sm' htmlFor={id}>
							{label}
						</Label>
					)}
					<Input
						ref={ref}
						className={`font-semibold text-base ${className}`}
						disabled={pending || disabled}
						id={id}
						name={id}
						placeholder={placeholder}
						defaultValue={defaultValue}
						onBlur={onBlur}
					/>
				</div>
				<FormErrors errors={errors} id={id} />
			</div>
		)
	}
)
export default FormInput

FormInput.displayName = 'FormInput'
