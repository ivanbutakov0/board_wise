import { prisma } from '@/lib/db'
import Board from './board'
import Form from './form'

const OrganizationIdPage = async () => {
	const boards = await prisma.board.findMany()
	return (
		<div>
			<Form />
			{boards.map(board => (
				<Board key={board.id} title={board.title} id={board.id} />
			))}
		</div>
	)
}

export default OrganizationIdPage
