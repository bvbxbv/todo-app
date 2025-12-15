import { Todo } from '../../types/todos';
import { addItem, getAllItems, deleteItem } from './crud';

const STORE_NAME: string = 'todos';

export function saveTodo(todo: Todo) {
	return addItem(STORE_NAME, todo);
}

export function getTodos() {
	return getAllItems<Todo>(STORE_NAME);
}

export function removeTodo(id: Todo['id']) {
	return deleteItem(STORE_NAME, id);
}
