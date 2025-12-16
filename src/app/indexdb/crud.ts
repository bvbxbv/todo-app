import { openDatabase } from './openDatabase';

export async function addItem<T>(storeName: string, item: T) {
	const db = await openDatabase(storeName);
	return new Promise<number>((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = store.add(item);
		request.onsuccess = () => resolve(request.result as number);
		request.onerror = () => reject(request.error);
	});
}

export async function getItemById<T>(storeName: string, id: IDBValidKey): Promise<T | undefined> {
	const db = await openDatabase(storeName);
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const request = store.get(id);

		request.onsuccess = () => resolve(request.result as T | undefined);
		request.onerror = () => reject(request.error);
	});
}

export async function getAllItems<T>(storeName: string): Promise<T[]> {
	const db = await openDatabase(storeName);
	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const request = store.getAll();
		request.onsuccess = () => resolve(request.result as T[]);
		request.onerror = () => reject(request.error);
	});
}

export async function updateItem<T>(storeName: string, item: T, key?: IDBValidKey): Promise<void> {
	const db = await openDatabase(storeName);

	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = key ? store.put(item, key) : store.put(item);
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

export async function deleteItem(storeName: string, id: number | string) {
	const db = await openDatabase(storeName);
	return new Promise<void>((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = store.delete(id);
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}
