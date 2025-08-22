'use client';

import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function AnswerGenerator({
	onGenerated,
	onSetAnswer
}: {
	onGenerated: (answers: string[]) => void;
	onSetAnswer?: (answer: string) => void;
}) {
	const [answers, setAnswers] = useState<string[]>([]);
	const ref = useRef<HTMLTextAreaElement>(null);

	return (
		<div className='flex flex-col items-center gap-4 w-full'>
			<div className='flex flex-col gap-2 w-full'>
				<div>
					<Textarea
						ref={ref}
						placeholder='Type an answer here...'
					/>
				</div>
				<Button
					onClick={(e) => {
						e.preventDefault();
						if (ref.current && ref.current.value.trim() !== '') {
							setAnswers([...answers, ref.current.value]);
							ref.current.value = '';
						}
					}}>
					Add Answer
				</Button>
			</div>

			<div className='flex flex-col gap-2 w-full'>
				<div className='px-2 w-full flex flex-col gap-2'>
					{answers.map((answer) => (
						<div
							key={answer}
							className='flex flex-row items-center justify-between gap-2 w-full'>
							<li className='list-disc w-full'>{answer}</li>

							<Button
								onClick={(e) => {
									e.preventDefault();

									setAnswers(answers.filter((a) => a !== answer));
								}}
								variant={'secondary'}
								size={'icon'}>
								<X className='text-red-600' />
							</Button>

							<Button
								onClick={(e) => {
									e.preventDefault();

									onSetAnswer?.(answer);
								}}
								variant={'secondary'}
								size={'icon'}>
								<Check className='text-green-600' />
							</Button>
						</div>
					))}
				</div>
			</div>

			<Button
				className={cn(
					answers.length === 0 || answers.length > 4 ? 'hidden' : 'block'
				)}
				onClick={(e) => {
					e.preventDefault();
					onGenerated(answers);
					setAnswers([]);
				}}>
				Generate
			</Button>
		</div>
	);
}
