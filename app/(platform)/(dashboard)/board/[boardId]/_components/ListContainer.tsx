'use client'

import { ListWithCards } from '@/types'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import ListForm from './ListForm'
import ListItem from './ListItem'

interface ListContainerProps {
	data: ListWithCards[]
	boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data)

	useEffect(() => {
		setOrderedData(data)
	}, [data])

	const onDragEnd = (result: any) => {
		const { destination, source, draggableId, type } = result

		console.log(result)

		if (!destination) return

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		// If user moves a list
		if (type === 'list') {
			console.log(1)
		}

		// If user moves a card
		if (type === 'card') {
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
