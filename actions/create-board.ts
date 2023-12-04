'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'

export type State = {
	message?: string | null
	errors?: {
		title?: string[]
	}
}

const BoardTitleSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Title should be at least 1 character' })
		.max(20, { message: 'Title should be at most 20 characters' }),
})

export async function createBoard(PrevState: State, formData: FormData) {
	const validatedFields = BoardTitleSchema.safeParse({
		title: formData.get('title'),
	})

	if (!validatedFields.success) {
		return {
			message: 'Missing fields.',
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { title } = validatedFields.data

	try {
		await prisma?.board.create({
			data: {
				title,
			},
		})
	} catch (e) {
		return {
			message: 'Database Error',
		}
	}
	revalidatePath('/organization/org_2Yt60PJVKzw3yPQM6kQik2Lflam')
	redirect('/organization/org_2Yt60PJVKzw3yPQM6kQik2Lflam')
}
