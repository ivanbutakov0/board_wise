'use client'

import { updateCardOrder } from '@/actions/update-card-order'
import { updateListOrder } from '@/actions/update-list-order'
import { useAction } from '@/hooks/use-action'
import { ListWithCards } from '@/types'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import ListForm from './ListForm'
import ListItem from './ListItem'

interface ListContainerProps {
	data: ListWithCards[]
	boardId: string
}

const newOrder = <T,>(list: T[], startIndex: number, endIndex: number) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data)

	const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
		onSuccess: () => {
			toast.success('List order updated!')
		},
		onError: error => {
			toast.error(error)
		},
	})

	const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
		onSuccess: () => {
			toast.success('Card order updated!')
		},
		onError: error => {
			toast.error(error)
		},
	})

	useEffect(() => {
		setOrderedData(data)
	}, [data])

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result

		if (!destination) return

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		// If user moves a list
		if (type === 'list') {
			const items = newOrder(orderedData, source.index, destination.index).map(
				(item, index) => ({ ...item, order: index })
			)

			setOrderedData(items)
			executeUpdateListOrder({ items, boardId })
		}

		// If user moves a card
		if (type === 'card') {
			const newOrderedData = [...orderedData]

			const sourceList = newOrderedData.find(
				list => list.id === source.droppableId
			)
			const destinationList = newOrderedData.find(
				list => list.id === destination.droppableId
			)

			if (!sourceList || !destinationList) return

			if (!sourceList.cards) {
				sourceList.cards = []
			}

			if (!destinationList.cards) {
				destinationList.cards = []
			}

			// If user moves a card within the same list
			if (destination.droppableId === source.droppableId) {
				const reorderedCards = newOrder(
					sourceList.cards,
					source.index,
					destination.index
				)

				reorderedCards.forEach((card, index) => {
					card.order = index
				})

				sourceList.cards = reorderedCards

				setOrderedData(newOrderedData)
				executeUpdateCardOrder({ items: reorderedCards, boardId })
			}

			// If user moves a card from one list to another
			else {
				// Remove card from source list
				const [card] = sourceList.cards.splice(source.index, 1)

				// Add card to destination list
				destinationList.cards.splice(destination.index, 0, card)

				// Change card list id
				card.listId = destinationList.id

				// Change source cards indexes
				sourceList.cards.forEach((card, index) => {
					card.order = index
				})

				// Change destination cards indexes
				destinationList.cards.forEach((card, index) => {
					card.order = index
				})

				setOrderedData(newOrderedData)
				executeUpdateCardOrder({ items: destinationList.cards, boardId })
			}
		}
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='lists' direction='horizontal' type='list'>
				{provided => (
					<ol
						ref={provided.innerRef}
						{...provided.droppableProps}
						className='flex gap-x-3 h-full'
					>
						{orderedData.map((list, index) => (
							<ListItem key={list.id} list={list} index={index} />
						))}
						{provided.placeholder}
						<ListForm />
						<div className='flex-shrink-0 w-1' />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}
export default ListContainer
