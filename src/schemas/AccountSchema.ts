import { z } from 'zod';

const AccountSchema = z.object({
  name: z.string().min(6).max(18),
  pass: z.string().min(6).max(48),
});

export default AccountSchema;
