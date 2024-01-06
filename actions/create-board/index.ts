'use server'

import createAuditLog from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const canCreate = await hasAvailableCount()

	if (!canCreate) {
		return {
			error: 'No more boards available',
		}
	}

	const { title, image } = data

	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
		image.split('|')

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHTML ||
		!imageUserName
	) {
		return {
			error: 'Missing fields. Failed to create board.',
		}
	}

	let board

	try {
		board = await prisma.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageLinkHTML,
				imageUserName,
			},
		})

		await incrementAvailableCount()

		createAuditLog({
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			entityTitle: board.title,
			action: ACTION.CREATE,
		})
	} catch (err) {
		return {
			error: 'Filed to create board',
		}
	}

	revalidatePath(`/board/${board.id}`)
	return {
		data: board,
	}
}

export const createBoard = createSafeAction(CreateBoard, handler)
