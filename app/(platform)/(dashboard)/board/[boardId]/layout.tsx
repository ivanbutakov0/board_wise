import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import BoardNavbar from './_components/BoardNavbar'

const BoardLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode
	params: { boardId: string }
}) => {
	const { orgId } = auth()

	if (!orgId) {
		redirect('/select-org')
	}

	const board = await prisma.board.findUnique({
		where: {
			id: params.boardId,
			orgId,
		},
	})

	if (!board) {
		notFound()
	}

	return (
		<div
			className='relative h-full bg-no-repeat bg-cover bg-center'
			style={{ backgroundImage: `url(${board.imageFullUrl})` }}
		>
			<BoardNavbar data={board} />
			<div className='absolute inset-0 bg-black/30' />
			<main>{children}</main>
		</div>
	)
}

export default BoardLayout
