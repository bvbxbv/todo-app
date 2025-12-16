import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { TodoFormData } from '../../types/forms';
import { addTodo, removeTodo, updateTodo } from '../../store/todoSlice';
import { formatDate } from '../../utils/date';
import { error, log } from '../../utils/logger';
import * as crud from '../../app/indexdb/todos';
import { Todo } from '../../types/todos';

const store = {
	addTodo,
	removeTodo,
	updateTodo,
};

export function useTodos() {
	const todos = useSelector((state: RootState) => state.todos.items);
	const dispatch = useDispatch();

	const addTodo = (todo: TodoFormData): void => {
		dispatch(
			store.addTodo({
				id: crypto.randomUUID(),
				title: todo.title,
				detail: todo.description ?? '',
				timestamp: formatDate(new Date()),
				done: false,
			}),
		);
	};

	const removeTodo = (id: string): void => {
		dispatch(store.removeTodo(id));
		try {
			crud.removeTodo(id);
			log('[useTodos.removeTodo] Succesfully deleted', id);
		} catch (e) {
			error('[useTodos.removeTodo] Error when deleting. Error', e);
		}
	};

	const completeTodo = async (id: string): Promise<void> => {
		const todo = await crud.getTodo(id);
		if (!todo) {
			error('[useTodos.completeTodo] crud.getTodo returns undefined|null for some reason');
			return;
		}
		const _todo = todo;
		_todo.done = true;
		dispatch(store.updateTodo(_todo));
	};

	const updateTodo = async (id: string, title: string, detail: string): Promise<void> => {
		const todo = await getTodo(id);
		if (!todo) {
			error('[useTodos.updateTodo] todo is undefined|null');
			return;
		}
		dispatch(
			store.updateTodo({
				id: id,
				title: title,
				detail: detail,
				timestamp: todo.timestamp,
				done: todo.done,
			}),
		);
	};

	const getTodo = async (id: string): Promise<Todo | undefined> => {
		return await crud.getTodo(id);
	};

	return { todos, addTodo, removeTodo, completeTodo, getTodo, dispatch, updateTodo };
}
