import { z } from 'zod'

export const UpdateList = z.object({
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title is required',
		})
		.min(3, { message: 'Title should be at least 3 characters' }),
	boardId: z.string(),
	id: z.string(),
})
