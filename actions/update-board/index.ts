'use server'

import createAuditLog from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { UpdateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, id } = data

	let board

	try {
		board = await prisma.board.update({
			where: {
				id,
				orgId,
			},
			data: {
				title,
			},
		})

		createAuditLog({
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			entityTitle: board.title,
			action: ACTION.UPDATE,
		})
	} catch (err) {
		return {
			error: 'Filed to update board',
		}
	}

	revalidatePath(`/board/${id}`)

	return {
		data: board,
	}
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
