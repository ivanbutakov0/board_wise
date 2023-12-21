import { ListWithCards } from '@/types'
import ListHeader from './ListHeader'

interface ListItemProps {
	list: ListWithCards
	index: number
}

const ListItem = ({ list, index }: ListItemProps) => {
	return (
		<li className='w-[272px] h-full select-none'>
			<div className='w-full rounded-md bg-white/90 shadow-md p-2'>
				<ListHeader data={list} />
			</div>
		</li>
	)
}
export default ListItem
