import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createNoteSchema } from '../../../schema/note.schema'
import { router, publicProcedure, protectedProcedure } from '../trpc'

export const noteRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can see this secret message!'
  }),
  findNotesByUserId: protectedProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.note.findMany({
        where: {
          userId: ctx.session.user.id,
          title: {
            contains: input?.text ? input.text : undefined,
          },
        },
      })
    }),
  updateNoteById: protectedProcedure
    .input(
      z
        .object({
          title: z.string().min(1),
          body: z.string().optional(),
          noteId: z.string(),
        })
        .nullish()
    )
    .mutation(async ({ ctx, input }) => {
      let title = input?.title
      let body = input?.body
      let noteId = input?.noteId

      if (!noteId || !title) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Could not find noteId or tile from input',
        })
      }
      const note = await ctx.prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          title: title,
          body: body ? body : undefined,
        },
      })
      return note
    }),
  deleteNote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id } = input
      return ctx.prisma.note.delete({
        where: {
          id: id,
        },
      })
    }),
  saveNote: protectedProcedure
    .input(createNoteSchema)
    .mutation(({ ctx, input }) => {
      let { title: noteTitle, body: noteBody } = input
      let id: string | undefined = ctx.session.user.id

      if (!id || !noteTitle) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Could not find user id from session',
        })
      }

      return ctx.prisma.note.create({
        data: {
          title: noteTitle,
          body: noteBody ? noteBody : '',
          user: { connect: { id: id } },
        },
      })
    }),
})
