'use client';
import { questionSchema } from '@/lib/validators';
import { Form, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AddQuestionForm() {
	const form = useForm<z.infer<typeof questionSchema>>({
		defaultValues: {
			id: '',
			createdAt: new Date(),
			updatedAt: new Date(),
			question: '',
			answer: '',
			possibleAnswers: ['', '', '', '']
		}
	});

	const onSubmit: SubmitHandler<z.infer<typeof questionSchema>> = (
		data: z.infer<typeof questionSchema>
	) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}></form>
		</Form>
	);
}
