'use server';

import { formatError, getToday } from '@/lib/utils';
import { questionSchema } from '@/lib/validators';
import { Question } from '@/types';
import prisma from '../db/prisma';

export async function createQuestion(data: Question) {
	try {
		const validated = questionSchema.parse(data);

		const newQuestion = await prisma.question.create({
			data: {
				createdAt: new Date(getToday().current),
				...validated
			}
		});

		if (!newQuestion) {
			throw new Error('Failed to create question');
		}

		return {
			success: true,
			data: newQuestion
		};
	} catch (err: unknown) {
		return {
			success: false,
			message: formatError(err)
		};
	}
}

export async function getQuestions() {
	try {
		const questions = await prisma.question.findMany();
		return {
			success: true,
			data: questions
		};
	} catch (err: unknown) {
		return {
			success: false,
			message: formatError(err)
		};
	}
}
