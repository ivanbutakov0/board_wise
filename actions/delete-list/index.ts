'use server'

import createAuditLog from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { DeleteList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId } = data

	let list

	try {
		list = await prisma.list.delete({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
		})

		createAuditLog({
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			entityTitle: list.title,
			action: ACTION.DELETE,
		})
	} catch (err) {
		return {
			error: 'Filed to delete list',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return {
		data: list,
	}
}

export const deleteList = createSafeAction(DeleteList, handler)
