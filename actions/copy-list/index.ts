'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { CopyList } from './schema'
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

	let listToCopy

	try {
		listToCopy = await prisma.list.findUnique({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			include: {
				cards: true,
			},
		})

		if (!listToCopy) {
			return {
				error: 'List not found',
			}
		}

		const lastList = await prisma.list.findFirst({
			where: {
				boardId,
			},
			orderBy: {
				order: 'desc',
			},
			select: { order: true },
		})

		const newOrder = lastList ? lastList.order + 1 : 1

		list = await prisma.list.create({
			data: {
				title: `${listToCopy.title} – Copy`,
				boardId: listToCopy.boardId,
				order: newOrder,
				cards: {
					createMany: {
						data: listToCopy.cards.map(card => ({
							title: card.title,
							description: card.description,
							order: card.order,
						})),
					},
				},
			},
			include: {
				cards: true,
			},
		})
	} catch (err) {
		return {
			error: 'Filed to copy list',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return {
		data: list,
	}
}

export const copyList = createSafeAction(CopyList, handler)
