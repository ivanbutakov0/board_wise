import Hint from '@/components/Hint'
import FormPopover from '@/components/form/FormPopover'
import { Skeleton } from '@/components/ui/skeleton'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { prisma } from '@/lib/db'
import { getAvailableCount } from '@/lib/org-limit'
import { auth } from '@clerk/nextjs'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const BoardList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		redirect('/select-org')
	}

	const boards = await prisma.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	const availableBoards = await getAvailableCount()
	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-2'>
				<User2 />
				<p className='text-xl font-bold'>Your Boards</p>
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
				{boards.map(board => (
					<Link
						href={`/board/${board.id}`}
						key={board.id}
						className='relative group aspect-video bg-center bg-no-repeat bg-cover rounded-sm bg-sky-700 h-full w-full p-2'
						style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
					>
						<div className='absolute top-0 left-0 w-full h-full group-hover:bg-black/40 bg-black/30 rounded-sm' />
						<p className='relative text-white font-bold'>{board.title}</p>
					</Link>
				))}

				<FormPopover sideOffset={10} side='right'>
					<div
						role='button'
						className='flex flex-col items-center justify-center p-8 bg-gray-100 hover:bg-gray-200 rounded-lg relative transition'
					>
						<p className='text-center'>Create new board</p>
						<span className='text-xs'>
							{MAX_FREE_BOARDS - availableBoards} remaining
						</span>
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

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className='grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
		</div>
	)
}
