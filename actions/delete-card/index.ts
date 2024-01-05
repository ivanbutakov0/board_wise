'use server'

import createAuditLog from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { DeleteCard } from './schema'
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

	try {
		card = await prisma.card.delete({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		})

		createAuditLog({
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
			action: ACTION.DELETE,
		})
	} catch (err) {
		return {
			error: 'Filed to delete card',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return {
		data: card,
	}
}

export const deleteCard = createSafeAction(DeleteCard, handler)
