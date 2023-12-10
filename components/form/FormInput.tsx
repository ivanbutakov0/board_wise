import { useFormStatus } from 'react-dom'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import FormErrors from './FormErrors'

interface FormInputProps {
	errors?: Record<string, string[] | undefined>
	id: string
	placeholder: string
	disabled?: boolean
	label?: string
	className?: string
}

const FormInput = ({
	errors,
	id,
	placeholder,
	disabled,
	label,
	className,
}: FormInputProps) => {
	const { pending } = useFormStatus()

	return (
		<div className='flex flex-col gap-2 mb-2'>
			<div className=''>
				{label && (
					<Label className='font-bold capitalize text-lg' htmlFor={id}>
						{label}
					</Label>
				)}
				<Input
					className={`${className} font-semibold text-base`}
					disabled={pending || disabled}
					id={id}
					name={id}
					placeholder={placeholder}
				/>
			</div>
			<FormErrors errors={errors} id={id} />
		</div>
	)
}
export default FormInput
