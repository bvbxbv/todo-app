import { Todo } from '../types/todos';

const DB_NAME = 'todoAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

export function openDatabase(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = function () {
			const db = request.result;
			const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.result);
	});
}

export async function saveTodo(todo: Todo) {
	const db = await openDatabase();
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.add(todo);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.result);
	});
}

export async function getTodos() {
	const db = await openDatabase();
	return new Promise<any[]>((resolve, reject) => {
		const transaction = db.transaction(STORE_NAME, 'readonly');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.getAll();
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
