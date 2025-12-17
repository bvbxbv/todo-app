import { Todo } from '../../types/todos';
import { TodoItem } from './TodoItem';

interface TodoListProps {
	todos: Todo[];
	onClose: (id: string) => void;
	onEdit: (id: string) => void;
	onComplete: (id: string) => void;
}

export function TodoList({ todos, onClose, onEdit, onComplete }: TodoListProps) {
	return (
		<>
			{todos.length === 0 && (
				<div id='todos-empty'>
					<p>
						There was a hole here.
						<br /> Do you want it gone?
					</p>
				</div>
			)}
			<section id='todo-list'>
				{todos.map((todo) => (
					<TodoItem
						id={todo.id}
						key={todo.id}
						title={todo.title}
						detail={todo.detail.length === 0 ? 'No detail provided' : todo.detail}
						timestamp={todo.timestamp}
						onClose={onClose}
						onEdit={onEdit}
						onComplete={onComplete}
						done={todo.done}
					/>
				))}
			</section>
		</>
	);
}
