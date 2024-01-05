'use server'

import createAuditLog from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { CreateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, listId, boardId } = data

	let card

	try {
		const list = await prisma.list.findUnique({
			where: {
				id: listId,
				board: {
					orgId,
				},
			},
		})

		if (!list) {
			return {
				error: 'List not found',
			}
		}

		const lastCard = await prisma.card.findFirst({
			where: {
				listId,
			},
			orderBy: {
				order: 'desc',
			},
			select: {
				order: true,
			},
		})

		const newOrder = lastCard ? lastCard.order + 1 : 1

		card = await prisma.card.create({
			data: {
				title,
				listId,
				order: newOrder,
			},
		})

		createAuditLog({
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
			action: ACTION.CREATE,
		})
	} catch (err) {
		return {
			error: 'Filed to create card',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: card,
	}
}

export const createCard = createSafeAction(CreateCard, handler)
