interface BoardPageProps {
	params: {
		boardId: string
	}
}

const BoardPage = async ({ params }: BoardPageProps) => {
	return <div>board id page</div>
}
export default BoardPage
