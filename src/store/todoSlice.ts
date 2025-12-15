import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todos';
import { saveTodo, getTodos, removeTodo as _removeTodo } from '../app/indexdb/todos';
import { error, log } from '../utils/logger';

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
					log('success', result);
				})
				.catch((result) => {
					error('failed', result);
				});
		},
		removeTodo(state, action: PayloadAction<string>) {
			state.items = state.items.filter((todo) => todo.id !== action.payload);
		},
	},
});

export const { addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
