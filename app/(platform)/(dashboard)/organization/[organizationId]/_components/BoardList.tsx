import Hint from '@/components/Hint'
import FormPopover from '@/components/form/FormPopover'
import { HelpCircle, User2 } from 'lucide-react'

const BoardList = () => {
	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-2'>
				<User2 />
				<p className='text-xl font-bold'>Your Boards</p>
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 '>
				{/* TODO: Board List */}

				<FormPopover sideOffset={10} side='right'>
					<div
						role='button'
						className='flex flex-col items-center justify-center p-8 bg-gray-100 hover:bg-gray-200 rounded-lg relative transition'
					>
						<p className='text-center'>Create new board</p>
						<span className='text-xs'> 5 remaining</span>
						<Hint
							side='bottom'
							description='Free Workspaces can have up to 5 open boards. For unlimited boards upgrade to Pro.'
							sideOffset={40}
						>
							<HelpCircle className='w-4 h-4 absolute bottom-2 right-2' />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	)
}
export default BoardList
