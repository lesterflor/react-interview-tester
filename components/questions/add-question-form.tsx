'use client';
import { createQuestion } from '@/actions/question-actions';
import { questionSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon, Plus } from 'lucide-react';
import { useState } from 'react';
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import AnswerGenerator from './answer-generator';

export default function AddQuestionForm() {
	const form = useForm<z.infer<typeof questionSchema>>({
		resolver: zodResolver(questionSchema),
		defaultValues: {
			question: '',
			answer: '',
			possibleAnswers: ['', '', '', '']
		}
	});

	const [generatedAnswers, setGeneratedAnswers] = useState<string[]>([]);

	const onSubmit: SubmitHandler<z.infer<typeof questionSchema>> = async (
		data: z.infer<typeof questionSchema>
	) => {
		const res = await createQuestion(data);

		if (res.success) {
			toast.success('Question created successfully');
			form.reset();
			setGeneratedAnswers([]);
		} else {
			toast.error(`Error: ${res.message}`);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-4 items-center w-full'>
					<div className='w-full'>
						<FormField
							name='question'
							control={form.control}
							render={({
								field
							}: {
								field: ControllerRenderProps<
									z.infer<typeof questionSchema>,
									'question'
								>;
							}) => (
								<FormItem>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Type your question here...'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='flex flex-col gap-2 items-center w-full'>
						<FormField
							name='possibleAnswers'
							control={form.control}
							render={({
								field
							}: {
								field: ControllerRenderProps<
									z.infer<typeof questionSchema>,
									'possibleAnswers'
								>;
							}) => (
								<FormItem className='w-full'>
									<FormLabel className='text-xs text-muted-foreground'>
										Possible Answers
									</FormLabel>
									<FormControl>
										<AnswerGenerator
											onGenerated={(answers) => {
												form.setValue('possibleAnswers', answers);
												setGeneratedAnswers(answers);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex flex-col gap-2 items-center'>
							<div>Possible Answers</div>
							<ul className='w-full text-xs px-2'>
								{generatedAnswers.map((answer) => (
									<li
										className='list-disc'
										key={answer}>
										{answer}
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='w-full'>
						<FormField
							control={form.control}
							name='answer'
							render={({
								field
							}: {
								field: ControllerRenderProps<
									z.infer<typeof questionSchema>,
									'answer'
								>;
							}) => (
								<FormItem>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Type the answer here...'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='flex flex-row items-end justify-end w-full'>
						<Button
							disabled={form.formState.isSubmitting}
							className='w-44 portrait:w-full'>
							{form.formState.isSubmitting ? (
								<LoaderIcon className='w-4 h-4 animate-spin' />
							) : (
								<Plus className='w-4 h-4' />
							)}
							{form.formState.isSubmitting ? 'Adding...' : 'Add'}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
