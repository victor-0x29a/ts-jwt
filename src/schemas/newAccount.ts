import { z } from 'zod';

const newAccountSchema = z.object({
  name: z.string().min(6).max(18),
  pass: z.string().min(6).max(48),
  passConfirm: z.string().min(6).max(48),
});

export default newAccountSchema;
