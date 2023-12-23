import FormSubmit from '@/components/form/FormSubmit'
import FormTextarea from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { forwardRef } from 'react'

interface CardFormProps {
	isEditing: boolean
	listId: string
	enableEditing: () => void
	disableEditing: () => void
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ isEditing, listId, enableEditing, disableEditing }, ref) => {
		if (isEditing) {
			return (
				<form action='' className='space-y-3'>
					<FormTextarea
						id='title'
						placeholder='Enter a title...'
						ref={ref}
						onBlur={disableEditing}
					/>
					<input id='listId' name='listId' value={listId} hidden />
					<div className='flex items-center justify-between'>
						<FormSubmit variant='default'>Add card</FormSubmit>
						<Button variant='ghost' size='sm' onClick={disableEditing}>
							<X className='w-4 h-4' />
						</Button>
					</div>
				</form>
			)
		}
		return (
			<div className='pt-2 px-2'>
				<Button
					onClick={enableEditing}
					size='sm'
					variant='ghost'
					className='w-full h-auto justify-start text-muted-foreground text-sm'
				>
					<Plus className='w-4 h-4 mr-2' />
					Add a card
				</Button>
			</div>
		)
	}
)
export default CardForm
