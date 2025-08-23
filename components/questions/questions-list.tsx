'use client';

import { getQuestions } from '@/actions/question-actions';
import {
	selectAnswerData,
	selectAnswerStatus
} from '@/lib/features/answers/answerSlice';
import {
	selectData,
	selectStatus
} from '@/lib/features/questions/questionSlice';
import { useAppSelector } from '@/lib/hooks';
import { GetQuestion } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import QuestionCard from './question-card';

export default function QuestionsList() {
	const questionsData = useAppSelector(selectData);
	const questionStatus = useAppSelector(selectStatus);
	const answersData = useAppSelector(selectAnswerData);
	const answersStatus = useAppSelector(selectAnswerStatus);

	const [questions, setQuestions] = useState<GetQuestion[]>([]);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);

	useEffect(() => {
		if (answersStatus === 'answered') {
			setAnsweredQuestions((prev) => prev + 1);
		}
	}, [answersData, answersStatus]);

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
			<QuestionCard
				key={item.id}
				question={item}
				index={indx}
			/>
		));
	}, [questions]);

	return (
		<div className='relative flex flex-col gap-4 items-center'>
			<div>
				<span className='font-semibold'>
					Answered Questions: {answeredQuestions} / {questions.length}
				</span>
			</div>
			<div>{questionsItems}</div>
		</div>
	);
}
