import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import FormSubmit from '@/components/form/FormSubmit'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

interface ListOptionsProps {
	onAddCard: () => void
	data: List
}

const ListOptions = ({ onAddCard, data }: ListOptionsProps) => {
	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: data => {
			toast.success(`List "${data.title}" has been deleted!`)
		},
		onError: error => {
			toast.error(error)
		},
	})

	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: data => {
			toast.success(`List "${data.title}" has been copied!`)
		},
		onError: error => {
			toast.error(error)
		},
	})

	const onDeleteList = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		closeRef.current?.click()

		executeDelete({ id, boardId })
	}

	const onCopyList = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		closeRef.current?.click()

		executeCopy({ id, boardId })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<MoreHorizontal className='w-4 h-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='relative px-0'
				side='bottom'
				align='start'
				sideOffset={10}
			>
				<p className='text-center text-sm font-medium mb-4'>Popover Actions</p>
				<PopoverClose ref={closeRef} className='absolute top-1 right-1'>
					<Button size='sm' variant='ghost'>
						<X className='w-4 h-4' />
					</Button>
				</PopoverClose>
				<Button
					onClick={onAddCard}
					variant='ghost'
					className='w-full justify-start rounded-none text-sm'
				>
					Add Card...
				</Button>
				<form action={onCopyList}>
					<input hidden id='id' name='id' value={data.id} />
					<input hidden id='boardId' name='boardId' value={data.boardId} />
					<FormSubmit
						variant='ghost'
						className='w-full rounded-none justify-start'
					>
						Copy list...
					</FormSubmit>
				</form>
				<Separator />
				<form action={onDeleteList}>
					<input hidden id='id' name='id' value={data.id} />
					<input hidden id='boardId' name='boardId' value={data.boardId} />
					<FormSubmit
						variant='ghost'
						className='w-full rounded-none justify-start'
					>
						Delete this list...
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
export default ListOptions
