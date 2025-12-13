import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todos';
import { getTodos, saveTodo } from '../app/indexdb';

interface TodosState {
	items: Todo[];
}

const initialState: TodosState = {
	items: await getTodos(),
};

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo(state, action: PayloadAction<Todo>) {
			state.items.push(action.payload);
			saveTodo(action.payload)
				.then((result) => {
					// FIXME: add logger
					console.log('success', result);
				})
				.catch((result) => {
					// FIXME: add logger
					console.error('failed', result);
				});
		},
	},
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
