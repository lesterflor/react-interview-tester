import { getQuestionSchema, questionSchema } from '@/lib/validators';
import z from 'zod';

export type Question = z.infer<typeof questionSchema>;
export type GetQuestion = z.infer<typeof getQuestionSchema>;
