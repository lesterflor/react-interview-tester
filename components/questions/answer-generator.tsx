'use client';

import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function AnswerGenerator({
	onGenerated
}: {
	onGenerated: (answers: string[]) => void;
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
						if (ref.current) {
							setAnswers([...answers, ref.current.value]);
							ref.current.value = '';
						}
					}}>
					Add Answer
				</Button>
			</div>

			<div className='flex flex-col gap-2'>
				<ul className='px-2'>
					{answers.map((answer) => (
						<li
							className='list-disc'
							key={answer}>
							{answer}
						</li>
					))}
				</ul>
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
