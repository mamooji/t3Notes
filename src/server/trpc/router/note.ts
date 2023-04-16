import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createNoteSchema } from '../../../schema/note.schema'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { Prisma } from '@prisma/client'

export const noteRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'you can see this secret message!'
  }),
  findNoteById: protectedProcedure
    .input(z.object({ noteId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.note.findUniqueOrThrow({
        where: {
          id: input.noteId,
        },
      })
    }),
  findNotesByUserId: protectedProcedure
    .input(z.object({ searchString: z.string().nullish(), filter: z.string() }))
    .query(async ({ ctx, input }) => {
      const filter = input.filter
      return await ctx.prisma.note.findMany({
        orderBy: {
          createdAt: filter,
        } as any,
        where: {
          userId: ctx.session.user.id,
          title: {
            contains: input?.searchString ? input.searchString : undefined,
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
      const title = input?.title
      const body = input?.body
      const noteId = input?.noteId

      if (!noteId || !title) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Could not find noteId or tile from input',
        })
      }
      return await ctx.prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          title: title,
          body: body ? body : undefined,
        },
      })
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
      const { title: noteTitle, body: noteBody } = input
      const id: string | undefined = ctx.session.user.id

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
