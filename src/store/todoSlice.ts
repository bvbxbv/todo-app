import { Todo } from '../types/todos';
import { error, log } from '../utils/logger';
import * as crud from '../app/indexdb/todos';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodosState {
	items: Todo[];
}

const initialState: TodosState = {
	items: await crud.getTodos(),
};

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo(state, action: PayloadAction<Todo>) {
			state.items.push(action.payload);
			crud.saveTodo(action.payload)
				.then((result) => {
					log('success', result);
				})
				.catch((result) => {
					error('failed', result);
				});
		},
		updateTodo(state, action: PayloadAction<Todo>) {
			const updatedTodo = action.payload;
			const index = state.items.findIndex((todo) => todo.id === updatedTodo.id);
			if (index !== -1) {
				state.items[index] = updatedTodo;
				crud.updateTodo(updatedTodo);
			}
		},
		removeTodo(state, action: PayloadAction<string>) {
			state.items = state.items.filter((todo) => todo.id !== action.payload);
		},
	},
});

export const { addTodo, updateTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
