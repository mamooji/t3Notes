import { router } from '../trpc'
import { authRouter } from './auth'
import { exampleRouter } from './example'
import { noteRouter } from './note'

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  note: noteRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
