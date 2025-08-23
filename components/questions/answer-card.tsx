'use client';

import { answered } from '@/lib/features/answers/answerSlice';
import { useAppDispatch } from '@/lib/hooks';
import { getAlphaIndx } from '@/lib/utils';
import { GetQuestion } from '@/types';
import { useState } from 'react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export default function AnswerCard({
	question,
	answers,
	onAnswer
}: {
	question: GetQuestion;
	answers: string[];
	onAnswer: (value: string) => void;
}) {
	const dispatch = useAppDispatch();

	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [submitting, setIsSubmitting] = useState(false);

	return (
		<>
			{!hasAnswered ? (
				<div className='flex flex-col gap-2 w-full'>
					<div className='pl-4'>
						<RadioGroup onValueChange={setSelectedAnswer}>
							{answers.map((answer, indx) => (
								<div
									className='flex flex-row items-center gap-2 pb-1'
									key={answer}>
									<RadioGroupItem
										value={answer}
										id={`answer-${indx}`}
									/>
									<div>{getAlphaIndx(indx)}.</div>
									<div className='leading-tight'>{answer}</div>
								</div>
							))}
						</RadioGroup>
					</div>
					{selectedAnswer && (
						<div className='pt-4'>
							<Button
								variant={'secondary'}
								onClick={() => {
									setIsSubmitting(true);
									onAnswer(selectedAnswer);
									setHasAnswered(true);

									setTimeout(() => {
										dispatch(
											answered({
												question: question.question,
												answer: selectedAnswer
											})
										);
										setIsSubmitting(false);
									}, 250);
								}}>
								Submit Answer
							</Button>
						</div>
					)}
				</div>
			) : (
				<div>{selectedAnswer}</div>
			)}
		</>
	);
}
