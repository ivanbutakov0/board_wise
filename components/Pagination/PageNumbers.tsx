'use client'

interface PageNumbersProps {
	pageNumbers: number[]
	onPageChange: (pageNumber: number) => void
	currentPage: number
}

const PageNumbers = ({
	pageNumbers,
	onPageChange,
	currentPage,
}: PageNumbersProps) => {
	return (
		<div className='flex gap-2'>
			{pageNumbers.map((number, index) => (
				<button
					className={`${
						index + 1 === currentPage && 'bg-blue-200'
					} text-sm h-8 w-8 rounded-md bg-blue-100 hover:bg-slate-100`}
					type='button'
					key={number}
					onClick={() => onPageChange(number)}
					disabled={index + 1 === currentPage}
				>
					{number}
				</button>
			))}
		</div>
	)
}
export default PageNumbers
