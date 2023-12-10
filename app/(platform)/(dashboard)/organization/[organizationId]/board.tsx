import { deleteBoard } from '@/actions/deleate'
import { Button } from '@/components/ui/button'

interface BoardProps {
	title: string
	id: string
}

const Board = ({ title, id }: BoardProps) => {
	const deleteBoardWithId = deleteBoard.bind(null, id)

	return (
		<form action={deleteBoardWithId} className='flex gap-4 items-center'>
			<p>{title}</p>
			<Button type='submit' size='sm' variant='destructive'>
				Delete
			</Button>
		</form>
	)
}
export default Board
