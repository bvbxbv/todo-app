import { Todo } from '../../types/todos';
import { addItem, getAllItems } from './crud';

const STORE_NAME: string = 'todos';

export function saveTodo(todo: Todo) {
	return addItem(STORE_NAME, todo);
}

export function getTodos() {
	return getAllItems<Todo>(STORE_NAME);
}
