'use server'

import createAuditLog from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { CreateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, boardId } = data

	let list

	try {
		const board = await prisma.board.findUnique({
			where: {
				id: boardId,
				orgId,
			},
		})

		if (!board) {
			return {
				error: 'Board not found',
			}
		}

		const lastList = await prisma.list.findFirst({
			where: {
				boardId: boardId,
			},
			orderBy: {
				order: 'desc',
			},
			select: {
				order: true,
			},
		})

		const newOrder = lastList ? lastList.order + 1 : 1

		list = await prisma.list.create({
			data: {
				title,
				boardId,
				order: newOrder,
			},
		})

		createAuditLog({
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			entityTitle: list.title,
			action: ACTION.CREATE,
		})
	} catch (err) {
		return {
			error: 'Filed to create list',
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: list,
	}
}

export const createList = createSafeAction(CreateList, handler)
