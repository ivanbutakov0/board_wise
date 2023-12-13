import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

interface FormSubmitProps {
	children: React.ReactNode
	disabled?: boolean
	className?: string
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| 'primary'
}

const FormSubmit = ({
	children,
	disabled,
	className,
	variant = 'primary',
}: FormSubmitProps) => {
	const { pending } = useFormStatus()
	return (
		<Button
			className={`${className}`}
			disabled={pending || disabled}
			variant={variant}
		>
			{children}
		</Button>
	)
}
export default FormSubmit
