'use client'

import { ListWithCards } from '@/types'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { ElementRef, useRef, useState } from 'react'
import CardForm from './CardForm'
import CardItem from './CardItem'
import ListHeader from './ListHeader'

interface ListItemProps {
	list: ListWithCards
	index: number
}

const ListItem = ({ list, index }: ListItemProps) => {
	const [isEditing, setIsEditing] = useState(false)

	const textareaRef = useRef<ElementRef<'textarea'>>(null)

	const enableEditing = () => {
		setIsEditing(true)

		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	return (
		<Draggable draggableId={list.id} index={index}>
			{provided => (
				<li
					{...provided.draggableProps}
					ref={provided.innerRef}
					className='w-[272px] h-full select-none'
				>
					<div
						{...provided.dragHandleProps}
						className='w-full rounded-md bg-white/90 shadow-md p-2'
					>
						<ListHeader data={list} onAddCard={enableEditing} />
						<Droppable droppableId={list.id} type='card'>
							{provided => (
								<ol
									ref={provided.innerRef}
									{...provided.droppableProps}
									className={`${
										list.cards.length > 0 ? 'mt-2' : 'mt-0'
									} mx-1 px-1 py-0.5 flex flex-col gap-y-2`}
								>
									{list.cards.map((card, index) => (
										<CardItem key={card.id} card={card} index={index} />
									))}
									{provided.placeholder}
								</ol>
							)}
						</Droppable>
						<CardForm
							ref={textareaRef}
							isEditing={isEditing}
							listId={list.id}
							enableEditing={enableEditing}
							disableEditing={disableEditing}
						/>
					</div>
				</li>
			)}
		</Draggable>
	)
}
export default ListItem
