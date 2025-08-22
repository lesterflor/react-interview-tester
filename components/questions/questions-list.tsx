'use client';

import { getQuestions } from '@/actions/question-actions';
import {
	selectData,
	selectStatus
} from '@/lib/features/questions/questionSlice';
import { useAppSelector } from '@/lib/hooks';
import { getAlphaIndx } from '@/lib/utils';
import { GetQuestion } from '@/types';
import { useEffect, useMemo, useState } from 'react';

export default function QuestionsList() {
	const questionsData = useAppSelector(selectData);
	const questionStatus = useAppSelector(selectStatus);

	const [questions, setQuestions] = useState<GetQuestion[]>([]);

	const fetchQuestions = async () => {
		const res = await getQuestions();

		if (res.success) {
			setQuestions(res.data as GetQuestion[]);
		}
	};

	useEffect(() => {
		if (questionStatus === 'idle') {
			// Fetch questions data
			fetchQuestions();
		}
	}, [questionStatus, questionsData]);

	const questionsItems = useMemo(() => {
		return questions.map((item, indx) => (
			<div
				key={item.id}
				className='flex flex-col gap-2 items-start pb-4'>
				<div>
					{indx + 1}.{' '}
					<span className='font-semibold text-lg leading-tight'>
						{item.question}
					</span>
				</div>
				<div>
					{item.possibleAnswers.map((answer, indx) => (
						<div
							className='flex flex-row gap-2'
							key={answer}>
							<div>{getAlphaIndx(indx)}.</div>
							<div>{answer}</div>
						</div>
					))}
				</div>
			</div>
		));
	}, [questions]);

	return <div>{questionsItems}</div>;
}
