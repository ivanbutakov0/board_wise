import { createCard } from '@/actions/create-card'
import FormSubmit from '@/components/form/FormSubmit'
import FormTextarea from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Plus, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface CardFormProps {
	isEditing: boolean
	listId: string
	enableEditing: () => void
	disableEditing: () => void
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ isEditing, listId, enableEditing, disableEditing }, ref) => {
		const params = useParams()
		const formRef = useRef<ElementRef<'form'>>(null)

		const { execute, fieldErrors } = useAction(createCard, {
			onSuccess: () => {
				toast.success('Card has been created!')
				formRef.current?.reset()
				disableEditing()
			},
			onError: error => {
				toast.error(error)
			},
		})

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				disableEditing()
			}
		}

		useEventListener('keydown', onKeyDown)
		useOnClickOutside(formRef, disableEditing)

		const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				formRef.current?.requestSubmit()
			}
		}

		const onSubmit = async (formData: FormData) => {
			const title = formData.get('title') as string
			const listId = formData.get('listId') as string
			const boardId = params.boardId as string

			execute({ title, listId, boardId })
		}

		if (isEditing) {
			return (
				<form ref={formRef} action={onSubmit} className='space-y-2 px-2 pt-2'>
					<FormTextarea
						id='title'
						placeholder='Enter a title...'
						ref={ref}
						errors={fieldErrors}
						onKeyDown={onTextareaKeyDown}
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
					className='py-2 w-full h-auto justify-start text-muted-foreground text-sm'
				>
					<Plus className='w-4 h-4 mr-2' />
					Add a card
				</Button>
			</div>
		)
	}
)
export default CardForm

CardForm.displayName = 'CardForm'
