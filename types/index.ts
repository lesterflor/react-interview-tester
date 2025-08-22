import { questionSchema } from '@/lib/validators';
import z from 'zod';

export type Question = z.infer<typeof questionSchema>;
