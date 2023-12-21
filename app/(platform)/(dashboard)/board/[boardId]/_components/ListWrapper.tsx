const ListWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<li className='flex-shrink-0 h-full w-[272px] select-none'>{children}</li>
	)
}

export default ListWrapper
