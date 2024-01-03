'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'
import { useQuery } from '@tanstack/react-query'
import Actions from './Actions'
import Description from './Description'
import Header from './Header'

const CardModal = () => {
	const id = useCardModal(state => state.id)
	const isOpen = useCardModal(state => state.isOpen)
	const onClose = useCardModal(state => state.onClose)

	const { data: cardData } = useQuery<CardWithList>({
		queryKey: ['card', id],
		queryFn: () => fetch(`/api/cards/${id}`).then(res => res.json()),
	})

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
				{!cardData ? <Description.Skeleton /> : <Description data={cardData} />}
				{!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
			</DialogContent>
		</Dialog>
	)
}

export default CardModal
