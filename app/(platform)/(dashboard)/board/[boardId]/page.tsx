import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import ListContainer from './_components/ListContainer'

interface BoardPageProps {
	params: {
		boardId: string
	}
}

const BoardPage = async ({ params }: BoardPageProps) => {
	const { orgId } = auth()

	if (!orgId) {
		redirect('/select-org')
	}

	const lists = await prisma.list.findMany({
		where: {
			boardId: params.boardId,
			board: {
				orgId,
			},
		},
		include: {
			cards: {
				orderBy: {
					order: 'asc',
				},
			},
		},
		orderBy: {
			order: 'asc',
		},
	})

	return (
		<div className='px-4 h-full overflow-x-auto'>
			<ListContainer boardId={params.boardId} data={lists} />
		</div>
	)
}
export default BoardPage
