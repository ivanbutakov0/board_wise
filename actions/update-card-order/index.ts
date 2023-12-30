'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { items, boardId } = data

	let cards

	try {
		const transaction = items.map(card =>
			prisma.card.update({
				where: {
					id: card.id,
					list: {
						board: {
							orgId,
						},
					},
				},
				data: {
					order: card.order,
					listId: card.listId,
				},
			})
		)

		cards = await prisma.$transaction(transaction)
	} catch (err) {
		return {
			error: 'Filed to reorder',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: cards,
	}
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
