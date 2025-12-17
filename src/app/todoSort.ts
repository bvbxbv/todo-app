import { Todo } from '../types/todos';

export type SortOrder = 'asc' | 'desc';
export type FilterName = 'all' | 'title' | 'detail' | 'timestamp';

export function applyTodoFilters(
	todos: Todo[],
	sortOrder: SortOrder,
	filterName: FilterName,
	query: string,
	filterDay: number,
) {
	const _query = query.toLowerCase();
	return [...todos]
		.sort((a, b) => {
			return sortOrder === 'asc'
				? a.title.localeCompare(b.title)
				: b.title.localeCompare(a.title);
		})
		.filter((todo) => {
			if (filterDay === 0) {
				return true;
			}

			const todoDate = new Date(todo.timestamp);
			return todoDate.getDate() === filterDay;
		})
		.filter((todo) => {
			if (!_query) return true;

			const _todo = {
				title: todo.title.toLowerCase(),
				detail: todo.detail.toLowerCase(),
				timestamp: todo.timestamp.toLowerCase(),
			} as const;

			if (filterName === 'all') {
				return Object.values(_todo).some((key) => key.includes(_query));
			}

			const key = filterName as keyof typeof _todo;
			return _todo[key].includes(_query);
		});
}
