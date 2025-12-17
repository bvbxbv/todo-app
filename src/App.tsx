import './scss/main.scss';
import { Calendar } from './components/Calendar';
import { StatsContainer } from './components/stats/StatsContainer';
import { StatsContainerItem } from './components/stats/StatsContainerItem';
import { useMemo, useState } from 'react';
import { CalendarData } from './types/calendar';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { AddTodoForm } from './components/forms/AddTodoForm';
import { FilterName, SortOrder, applyTodoFilters } from './app/todoSort';
import { Modal } from './components/Modal';
import { EditTodoForm } from './components/forms/EditTodoForm';
import { useTodos } from './app/hooks/useTodos';
import { error } from './utils/logger';
import { useModal } from './app/hooks/useModal';
import { TodoList } from './components/todos/TodoList';
import { Filters } from './components/Filters';
import { formatDate, getDaysInMonth } from './utils/date';
import { set } from 'zod';

export function App() {
	const { todos, addTodo, removeTodo, completeTodo, getTodo, updateTodo } = useTodos();
	const [filterName, setFilterName] = useState<FilterName>('all');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const [query, setQuery] = useState('');
	const { isModalActive, openModal, closeModal } = useModal();
	const [todoTitle, setTodoTitle] = useState<string>('');
	const [todoDescription, setTodoDescription] = useState<string>('');
	const [todoId, setTodoId] = useState<string>('');
	const [filterDay, setFilterDay] = useState<number>(new Date().getDate());

	const _days = getDaysInMonth(new Date().getMonth(), new Date().getDay());
	const [calendarItems, setCalendarItems] = useState<CalendarData>({
		title: formatDate(new Date()),
		items: Array.from({ length: _days }, (_, i) => ({
			id: i + 1,
			number: i + 1,
		})),
	});

	const sortedTodos = useMemo(
		() => applyTodoFilters(todos, sortOrder, filterName, query, filterDay),
		[todos, filterName, sortOrder, query, filterDay],
	);

	const onEditButtonClick = async (id: string) => {
		openModal();

		setTodoId(id);
		const todo = await getTodo(id);
		if (!todo) {
			error('[App.onEdit] todo is undefined|null');
			return;
		}

		setTodoTitle(todo.title);
		setTodoDescription(todo.detail !== 'No detail provided' ? todo.detail : '');
	};

	const onEditFormSubmit = () => {
		updateTodo(todoId, todoTitle, todoDescription);
		closeModal();
	};

	return (
		<>
			<Modal title='Edit todo' isActive={isModalActive} onClose={closeModal}>
				<EditTodoForm
					title={todoTitle}
					description={todoDescription}
					onTitleChange={setTodoTitle}
					onDescriptionChange={setTodoDescription}
					onSubmit={onEditFormSubmit}
				/>
			</Modal>

			<header id='page-header'>
				<div className='__content'>
					Hello <span id='header-username'>%username%</span>! Ready to planning?
				</div>
			</header>
			<div id='page-container'>
				<aside id='page-sidebar'>
					<Calendar
						calendar={calendarItems}
						activeDay={filterDay}
						onClick={(day) => {
							setFilterDay(day);
						}}
					/>
					<StatsContainer>
						<StatsContainerItem
							title='Completed:'
							value={todos.filter((todo) => todo.done).length}
						/>
						<StatsContainerItem
							title='Pending:'
							value={todos.filter((todo) => !todo.done).length}
						/>
					</StatsContainer>

					<section id='change-username'>
						<Input
							labelText='Well, your new name is:'
							name='change-username'
							id='change-username-input'
							placeholder='>'
						/>
					</section>
				</aside>

				<main id='page-content'>
					<div className='__content'>
						<section id='todos'>
							<div className='__title'>
								<AddTodoForm onSubmit={addTodo} />
							</div>

							<div className='__content'>
								<Filters
									onFilterNameChange={setFilterName}
									filterName={filterName}
									onSortOrderChange={setSortOrder}
									sortOrder={sortOrder}
									onQueryChange={setQuery}
								/>

								<TodoList
									todos={sortedTodos}
									onClose={removeTodo}
									onEdit={onEditButtonClick}
									onComplete={completeTodo}
								/>

								<section id='load-more'>
									<Button text='Load more' id='load-more-button' />
								</section>
							</div>
						</section>
					</div>
				</main>
			</div>
		</>
	);
}
