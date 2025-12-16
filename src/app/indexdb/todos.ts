import { Todo } from '../../types/todos';
import { addItem, getAllItems, deleteItem, updateItem, getItemById } from './crud';

const STORE_NAME: string = 'todos';

export function saveTodo(todo: Todo): Promise<number> {
	return addItem(STORE_NAME, todo);
}

export function getTodos(): Promise<Todo[]> {
	return getAllItems<Todo>(STORE_NAME);
}

export function getTodo(id: string): Promise<Todo | undefined> {
	return getItemById<Todo>(STORE_NAME, id);
}

export function removeTodo(id: Todo['id']): Promise<void> {
	return deleteItem(STORE_NAME, id);
}

export function updateTodo(todo: Todo): Promise<void> {
	return updateItem<Todo>(STORE_NAME, todo);
}
