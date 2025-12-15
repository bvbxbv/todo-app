import { Todo } from '../../types/todos';
import { addItem, getAllItems, deleteItem, updateItem, getItemById } from './crud';

const STORE_NAME: string = 'todos';

export function saveTodo(todo: Todo) {
	return addItem(STORE_NAME, todo);
}

export function getTodos() {
	return getAllItems<Todo>(STORE_NAME);
}

export function getTodo(id: string) {
	return getItemById<Todo>(STORE_NAME, id);
}

export function removeTodo(id: Todo['id']) {
	return deleteItem(STORE_NAME, id);
}

export function updateTodo(todo: Todo) {
	return updateItem<Todo>(STORE_NAME, todo);
}
