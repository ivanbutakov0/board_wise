'use client'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'

interface BoardOptionsProps {
	id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
	const { execute, isLoading } = useAction(deleteBoard, {
		onError: error => {
			toast.error(error)
		},
	})

	const onDeleteHandler = () => {
		execute({ id })
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className='h-auto w-auto bg-transparent hover:bg-slate-50/10'>
					<MoreHorizontal />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='px-0 py-3' side='bottom' align='start'>
				<div className='text-sm text-neutral-600 font-medium text-center pb-4'>
					board options
				</div>
				<PopoverClose asChild>
					<Button
						variant='ghost'
						size='sm'
						className='absolute top-2 right-2 text-neutral-600'
					>
						<X className='w-4 h-4' />
					</Button>
				</PopoverClose>
				<Button
					variant='destructive'
					className='w-full h-auto p-2 px-5 justify-center'
					onClick={onDeleteHandler}
					disabled={isLoading}
				>
					Delete this board
				</Button>
			</PopoverContent>
		</Popover>
	)
}
export default BoardOptions
