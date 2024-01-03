import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'
import { Copy, Trash2, Wand } from 'lucide-react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

interface ActionsProps {
	data: CardWithList
}

const Actions = ({ data }: ActionsProps) => {
	const params = useParams()
	const onClose = useCardModal(state => state.onClose)

	const { execute: executeCopyCard } = useAction(copyCard, {
		onSuccess: () => {
			toast.success('Card has been copied!')
			onClose()
		},
		onError: () => {
			toast.error('Something went wrong!')
		},
	})

	const { execute: executeDeleteCard } = useAction(deleteCard, {
		onSuccess: () => {
			toast.success('Card has been deleted!')
			onClose()
		},
		onError: () => {
			toast.error('Something went wrong!')
		},
	})

	const onCopy = () => {
		const boardId = params.boardId as string

		executeCopyCard({ id: data.id, boardId })
	}

	const onDelete = () => {
		const boardId = params.boardId as string

		executeDeleteCard({ id: data.id, boardId })
	}

	return (
		<div className='flex items-start gap-x-3 w-full pr-4'>
			<Wand className='h-5 w-5 mt-0.5' />
			<div className='w-full flex flex-col gap-2'>
				<p className='font-semibold text-sm'>Actions</p>
				<div className='flex gap-2'>
					<Button
						onClick={onCopy}
						size='sm'
						variant='gray'
						className='flex-1 text-xs flex gap-1 font-semibold'
					>
						<Copy className='h-3 w-3' />
						Copy
					</Button>
					<Button
						onClick={onDelete}
						size='sm'
						variant='gray'
						className='flex-1 text-xs flex gap-1 font-semibold'
					>
						<Trash2 className='h-3 w-3' />
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}
export default Actions

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className='flex items-start gap-x-3 w-full pr-4'>
			<Skeleton className='h-5 w-5' />
			<div className='w-full flex flex-col gap-2'>
				<Skeleton className='h-5 w-24' />
				<div className='flex gap-2'>
					<Skeleton className='h-9 w-full' />
					<Skeleton className='h-9 w-full' />
				</div>
			</div>
		</div>
	)
}
