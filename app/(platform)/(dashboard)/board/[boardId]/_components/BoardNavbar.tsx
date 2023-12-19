import { Board } from '@prisma/client'
import BoardTitleForm from './BoardTitleForm'

interface BoardNavbarProps {
	data: Board
}

const BoardNavbar = ({ data }: BoardNavbarProps) => {
	return (
		<div className='w-full fixed top-[53px] z-10 text-white px-8 py-4 bg-black/30 font-bold'>
			<BoardTitleForm data={data} />
		</div>
	)
}
export default BoardNavbar
