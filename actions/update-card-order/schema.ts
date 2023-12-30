import { z } from 'zod'

export const UpdateCardOrder = z.object({
	items: z.array(
		z.object({
			order: z.number(),
			id: z.string(),
			title: z.string(),
			listId: z.string(),
			createdAt: z.date(),
			updatedAt: z.date(),
		})
	),
	boardId: z.string(),
})
