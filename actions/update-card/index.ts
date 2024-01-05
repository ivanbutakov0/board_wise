'use server'

import createAuditLog from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { UpdateCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId, ...values } = data

	let card

	try {
		card = await prisma.card.update({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
			data: {
				...values,
			},
		})

		createAuditLog({
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
			action: ACTION.UPDATE,
		})
	} catch (err) {
		return {
			error: 'Filed to update board',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: card,
	}
}

export const updateCard = createSafeAction(UpdateCard, handler)
