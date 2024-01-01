import { useCardModal } from '@/hooks/use-card-modal'
import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'

interface CardItemProps {
	card: Card
	index: number
}

const CardItem = ({ card, index }: CardItemProps) => {
	const cardModal = useCardModal()
	return (
		<Draggable draggableId={card.id} index={index}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					onClick={() => cardModal.onOpen(card.id)}
					role='button'
					className='w-full bg-transparent bg-white py-2 px-4 text-sm font-semibold rounded-md cursor-pointer shadow-sm truncate border-2 border-transparent hover:border-black'
				>
					{card.title}
				</div>
			)}
		</Draggable>
	)
}
export default CardItem
