'use client'

import { ListWithCards } from '@/types'
import { ElementRef, useRef, useState } from 'react'
import CardForm from './CardForm'
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
		<li className='w-[272px] h-full select-none'>
			<div className='w-full rounded-md bg-white/90 shadow-md p-2'>
				<ListHeader data={list} onAddCard={enableEditing} />
				<CardForm
					ref={textareaRef}
					isEditing={isEditing}
					listId={list.id}
					enableEditing={enableEditing}
					disableEditing={disableEditing}
				/>
			</div>
		</li>
	)
}
export default ListItem
