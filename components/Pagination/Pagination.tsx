'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import ActivityItem from '../ActivityItem'
import PageNumbers from './PageNumbers'

interface PaginationProps {
	data: any[]
	itemsPerPage: number
}
const Pagination = ({ data, itemsPerPage }: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(1)
	const lastItemIndex = currentPage * itemsPerPage
	const firstItemIndex = lastItemIndex - itemsPerPage
	const currentItems = data.slice(firstItemIndex, lastItemIndex)
	const totalPages = Math.ceil(data.length / itemsPerPage)
	const pageNumbers = []

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i)
	}

	const isLeftBtnDisabled = currentPage === 1
	const isRightBtnDisabled = currentPage === totalPages

	const onPageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const onPageLeftClick = () => {
		if (currentPage > 1) {
			setCurrentPage(prev => prev - 1)
		}
	}

	const onPageRightClick = () => {
		if (currentPage < totalPages) {
			setCurrentPage(prev => prev + 1)
		}
	}

	return (
		<div className='w-full h-[70vh] flex flex-col items-start justify-between'>
			<ol>
				{currentItems.map(item => (
					<ActivityItem key={item.id} data={item} />
				))}
			</ol>
			<div className='flex gap-2 mx-auto'>
				<button
					type='button'
					onClick={onPageLeftClick}
					disabled={isLeftBtnDisabled}
				>
					<ChevronLeft
						className={`${
							isLeftBtnDisabled && 'text-slate-300'
						} h-5 w-5 text-blue-500`}
					/>
				</button>
				<PageNumbers
					pageNumbers={pageNumbers}
					onPageChange={onPageChange}
					currentPage={currentPage}
				/>
				<button
					type='button'
					onClick={onPageRightClick}
					disabled={isRightBtnDisabled}
				>
					<ChevronRight
						className={`${
							isRightBtnDisabled && 'text-slate-300'
						} h-5 w-5 text-blue-500`}
					/>
				</button>
			</div>
		</div>
	)
}
export default Pagination
