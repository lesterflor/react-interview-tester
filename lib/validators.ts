import { z } from 'zod';

export const questionSchema = z.object({
	question: z.string().min(2).max(1000),
	answer: z.string().min(2).max(1000),
	possibleAnswers: z.array(z.string().min(2).max(1000)).min(2).max(4)
});
