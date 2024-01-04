import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { prisma } from './db'

interface Props {
	entityId: string
	entityType: ENTITY_TYPE
	entityTitle: string
	action: ACTION
}

const createAuditLog = async ({
	entityId,
	entityType,
	entityTitle,
	action,
}: Props) => {
	try {
		const { orgId } = auth()
		const user = await currentUser()

		if (!orgId || !user) {
			throw new Error('Unauthorized')
		}

		await prisma.auditLog.create({
			data: {
				entityId,
				entityType,
				entityTitle,
				action,
				userId: user.id,
				userImage: user?.imageUrl,
				userName: user?.firstName + ' ' + user?.lastName,
				orgId,
			},
		})
	} catch (error) {
		console.log('[AUDIT_LOG_ERROR]', error)
	}
}

export default createAuditLog
