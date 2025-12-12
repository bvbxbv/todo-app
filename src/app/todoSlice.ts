import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todos';

interface TodosState {
	items: Todo[];
}

const initialState: TodosState = {
	items: [],
};

export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo(state, action: PayloadAction<Todo>) {
			state.items.push(action.payload);
		},
	},
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
