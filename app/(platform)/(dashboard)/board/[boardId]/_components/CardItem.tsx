import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'

interface CardItemProps {
	card: Card
	index: number
}

const CardItem = ({ card, index }: CardItemProps) => {
	return (
		<Draggable draggableId={card.id} index={index}>
			{(provided, snapshot) => (
				<li
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					role='button'
					className='w-full bg-transparent bg-white py-2 px-4 text-sm font-semibold rounded-md cursor-pointer shadow-sm truncate border-2 border-transparent hover:border-black'
				>
					{card.title}
				</li>
			)}
		</Draggable>
	)
}
export default CardItem
