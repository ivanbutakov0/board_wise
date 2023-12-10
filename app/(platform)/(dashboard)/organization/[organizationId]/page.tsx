import { prisma } from '@/lib/db'
import Board from './board'
import Form from './form'

const OrganizationIdPage = async () => {
	const boards = await prisma.board.findMany()
	return (
		<div>
			<Form />
			<div className='flex flex-col gap-2'>
				{boards.map(board => (
					<Board key={board.id} title={board.title} id={board.id} />
				))}
			</div>
		</div>
	)
}

export default OrganizationIdPage
