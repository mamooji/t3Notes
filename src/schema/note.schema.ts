import z from 'zod'
export const createNoteSchema = z.object({
  title: z.string().min(1, { message: 'Title missing' }),
  body: z.string().optional(),
})

export const createNoteOutputSchema = z.object({
  title: z.string().min(1),
  body: z.string().optional(),
})

export const updateNoteSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: 'Title missing' }),
  body: z.string().optional(),
})
export type CreateNoteInput = z.TypeOf<typeof createNoteSchema>
export type UpdateNoteInput = z.TypeOf<typeof updateNoteSchema>
