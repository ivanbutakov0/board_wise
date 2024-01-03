'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { CopyCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId } = data

	let card

	let cardToCopy

	try {
		cardToCopy = await prisma.card.findUnique({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		})

		if (!cardToCopy) {
			return {
				error: 'Card not found',
			}
		}

		const lastCard = await prisma.card.findFirst({
			where: {
				listId: cardToCopy.listId,
			},
			orderBy: {
				order: 'desc',
			},
			select: { order: true },
		})

		const newOrder = lastCard ? lastCard.order + 1 : 1

		card = await prisma.card.create({
			data: {
				title: `${cardToCopy.title} – Copy`,
				description: cardToCopy.description,
				order: newOrder,
				listId: cardToCopy.listId,
			},
		})
	} catch (err) {
		return {
			error: 'Filed to copy card',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return {
		data: card,
	}
}

export const copyCard = createSafeAction(CopyCard, handler)
