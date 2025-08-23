'use client';

import {
	selectAnswerData,
	selectAnswerStatus
} from '@/lib/features/answers/answerSlice';
import { useAppSelector } from '@/lib/hooks';
import { GetQuestion } from '@/types';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnswerCard from './answer-card';

export default function QuestionCard({
	question,
	index
}: {
	question: GetQuestion;
	index: number;
}) {
	const [revealAnswer, setRevealAnswer] = useState(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

	const answerData = useAppSelector(selectAnswerData);
	const answerStatus = useAppSelector(selectAnswerStatus);

	useEffect(() => {
		if (answerStatus === 'revealAll') {
			setRevealAnswer(true);
		}
	}, [answerData, answerStatus]);

	return (
		<div
			key={question.id}
			className='flex flex-col gap-2 items-start pb-4'>
			<div>
				{index + 1}.{' '}
				<span className='font-semibold text-lg leading-tight'>
					{question.question}
				</span>
			</div>
			<AnswerCard
				question={question}
				answers={question.possibleAnswers}
				onAnswer={(answer) => {
					setIsAnswerCorrect(answer === question.answer);
				}}
			/>

			{revealAnswer && (
				<div>
					{isAnswerCorrect ? (
						<Check className='w-6 h-6 text-green-600' />
					) : (
						<X className='w-6 h-6 text-red-600' />
					)}
				</div>
			)}
		</div>
	);
}
