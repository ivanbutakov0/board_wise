import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

interface HintProps {
	children: React.ReactNode
	description: string
	side: 'top' | 'right' | 'bottom' | 'left'
	sideOffset?: number
}

const Hint = ({ children, description, side, sideOffset }: HintProps) => {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					sideOffset={sideOffset}
					className='max-w-xs'
				>
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
export default Hint
