import { createAppSlice } from '@/lib/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AnswerSliceState {
	value: {
		question: string;
		answer: string;
	};
	status: 'idle' | 'answered' | 'revealAll';
}

const initialState: AnswerSliceState = {
	value: {
		question: '',
		answer: ''
	},
	status: 'idle'
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const answerSlice = createAppSlice({
	name: 'answerSlice',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: (create) => ({
		answered: create.reducer(
			(
				state,
				action: PayloadAction<{
					question: string;
					answer: string;
				}>
			) => {
				state.value.question = action.payload.question;
				state.value.answer = action.payload.answer;
				state.status = 'answered';
			}
		),

		revealAnswers: create.reducer((state) => {
			state.status = 'revealAll';
		})
	}),

	selectors: {
		selectAnswerData: (state) => state.value,
		selectAnswerStatus: (state) => state.status
	}
});

export const { answered, revealAnswers } = answerSlice.actions;

export const { selectAnswerData, selectAnswerStatus } = answerSlice.selectors;
