import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { cardId: string } }
) {
	try {
		const { userId, orgId } = auth()

		if (!userId || !orgId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		// request the card from db
		const card = await prisma.card.findUnique({
			where: {
				id: params.cardId,
				list: {
					board: {
						orgId,
					},
				},
			},
			include: {
				list: {
					select: {
						title: true,
					},
				},
			},
		})

		return NextResponse.json(card)
	} catch (err) {
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
