import { ActionState } from '@/lib/create-safe-action'
import { Board } from '@prisma/client'
import * as z from 'zod'
import { UpdateBoard } from './schema'

export type InputType = z.infer<typeof UpdateBoard>
export type ReturnType = ActionState<InputType, Board>
