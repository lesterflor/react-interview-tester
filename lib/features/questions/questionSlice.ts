import { createAppSlice } from '@/lib/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface QuestionSliceState {
	value: {
		question: string;
		answer: string;
		possibleAnswers: string[];
	};
	status: 'idle' | 'added' | 'updated' | 'deleted';
}

const initialState: QuestionSliceState = {
	value: {
		question: '',
		answer: '',
		possibleAnswers: ['', '', '', '']
	},
	status: 'idle'
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const questionSlice = createAppSlice({
	name: 'questionSlice',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: (create) => ({
		added: create.reducer(
			(
				state,
				action: PayloadAction<{
					question: string;
					answer: string;
					possibleAnswers: string[];
				}>
			) => {
				// Redux Toolkit allows us to write "mutating" logic in reducers. It
				// doesn't actually mutate the state because it uses the Immer library,
				// which detects changes to a "draft state" and produces a brand new
				// immutable state based off those changes
				//state.value += 1;
				state.value.question = action.payload.question;
				state.value.answer = action.payload.answer;
				state.value.possibleAnswers = action.payload.possibleAnswers;
				state.status = 'added';
			}
		),

		updated: create.reducer(
			(
				state,
				action: PayloadAction<{
					question: string;
					answer: string;
					possibleAnswers: string[];
				}>
			) => {
				state.value.question = action.payload.question;
				state.value.answer = action.payload.answer;
				state.value.possibleAnswers = action.payload.possibleAnswers;
				state.status = 'updated';
			}
		),

		deleted: create.reducer(
			(
				state,
				action: PayloadAction<{
					question: string;
					answer: string;
					possibleAnswers: string[];
				}>
			) => {
				state.value.question = action.payload.question;
				state.value.answer = action.payload.answer;
				state.value.possibleAnswers = action.payload.possibleAnswers;
				state.status = 'deleted';
			}
		)
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectData: (state) => state.value,
		selectStatus: (state) => state.status
	}
});

// Action creators are generated for each case reducer function.
export const { added, updated, deleted } = questionSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectData, selectStatus } = questionSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
// 	(amount: number): AppThunk =>
// 	(dispatch, getState) => {
// 		const currentValue = selectCount(getState());

// 		if (currentValue % 2 === 1 || currentValue % 2 === -1) {
// 			dispatch(incrementByAmount(amount));
// 		}
// 	};
