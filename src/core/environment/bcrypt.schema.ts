import z from 'zod';

export const bcryptSchema = z.object({
  SALT_ROUNDS: z.string().transform(Number).pipe(z.number().min(0)),
});
