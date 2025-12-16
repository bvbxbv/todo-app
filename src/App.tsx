import './scss/main.scss';
import { Calendar } from './components/Calendar';
import { StatsContainer } from './components/stats/StatsContainer';
import { TodoItem } from './components/TodoItem';
import { StatsContainerItem } from './components/stats/StatsContainerItem';
import { useMemo, useState } from 'react';
import { CalendarData, CalendarItem } from './types/calendar';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { SelectContainer } from './components/ui/Select/SelectContainer';
import { SelectContainerItem } from './components/ui/Select/SelectContainerItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { AddTodoForm } from './components/forms/AddTodoForm';
import { TodoFormData } from './types/forms';
import { addTodo, removeTodo, updateTodo } from './store/todoSlice';
import { formatDate } from './utils/date';
import { FilterName, SortOrder, applyTodoFilters } from './app/todoSort';
import * as crud from './app/indexdb/todos';
import { error, log } from './utils/logger';
import { Modal } from './components/Modal';
import { EditTodoForm } from './components/forms/EditTodoForm';

export function App() {
	const todos = useSelector((state: RootState) => state.todos.items);
	const dispatch = useDispatch();

	const [calendarItems, setCalendarItems] = useState<CalendarData>({
		title: '11, Dec 2025',
		items: Array.from(
			{ length: 32 },
			(_, i): CalendarItem => ({
				id: i,
				number: i,
				completed: false,
			}),
		),
	});

	const onAddTodoFormSubmit = (data: TodoFormData): void => {
		dispatch(
			addTodo({
				id: crypto.randomUUID(),
				title: data.title,
				detail: data.description ?? '',
				timestamp: formatDate(new Date()),
				done: false,
			}),
		);
	};

	const onDelete = (id: string) => {
		dispatch(removeTodo(id));
		try {
			crud.removeTodo(id);
			log('deleted', id);
		} catch (e) {
			error('not deleted, error', e);
		}
	};

	const onEdit = (id: string) => {
		setIsEditModalActive(!isEditModalActive);

		setTodoId(id);

		crud.getTodo(id).then((result) => {
			log('', result);
			if (result?.title === undefined || result.detail === undefined) {
				return;
			}

			setTodoTitle(result.title);
			setTodoDescription(result.detail !== 'No detail provided' ? result.detail : '');
		});
	};

	const onComplete = (id: string) => {
		crud.getTodo(id).then((item) => {
			if (item === undefined) {
				error('Todo to complete is undefined');
				return;
			}
			dispatch(
				updateTodo({
					id: item?.id,
					title: item.title,
					detail: item.detail,
					timestamp: item?.timestamp,
					done: true,
				}),
			);
		});
	};

	const [filterName, setFilterName] = useState<FilterName>('all');
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
	const [query, setQuery] = useState('');
	const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);
	const sortedTodos = useMemo(
		() => applyTodoFilters(todos, sortOrder, filterName, query),
		[todos, filterName, sortOrder, query],
	);

	const [todoTitle, setTodoTitle] = useState<string>('');
	const [todoDescription, setTodoDescription] = useState<string>('');
	const [todoId, setTodoId] = useState<string>('');
	const onEditFormSubmit = () => {
		crud.getTodo(todoId).then((todo) => {
			if (todo?.timestamp === undefined || todo.done === undefined) {
				error('[edit form submit] todo.timestamp or todo.done. Payload: ', todo);
				return;
			}

			if (todoTitle.length === 0) {
				error('[edit form submit] todo.title is required');
				return;
			}

			const _todo = {
				id: todoId,
				title: todoTitle,
				detail: todoDescription,
				timestamp: todo?.timestamp,
				done: todo?.done,
			};

			dispatch(updateTodo(_todo));
		});
		setIsEditModalActive(false);
	};

	return (
		<>
			<Modal
				title='Edit todo'
				isActive={isEditModalActive}
				onClose={() => setIsEditModalActive(false)}
			>
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
					<Calendar calendar={calendarItems} />
					<StatsContainer>
						<StatsContainerItem title='Completed:' value={1} />
						<StatsContainerItem title='Pending:' value={0} />
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
								<AddTodoForm onSubmit={onAddTodoFormSubmit} />
							</div>

							<div className='__content'>
								<section id='filters'>
									<form action=''>
										<div className='group'>
											<div className='filter'>
												<SelectContainer
													name='filter-name'
													labelText='Filter'
													id='filter-name-select'
													onChange={(e) =>
														setFilterName(e.target.value as FilterName)
													}
													value={filterName}
												>
													<SelectContainerItem
														value='all'
														text='No matter what'
													/>
													<SelectContainerItem
														value='detail'
														text='By description'
													/>
													<SelectContainerItem
														value='title'
														text='By title'
													/>
													<SelectContainerItem
														value='timestamp'
														text='By date'
													/>
												</SelectContainer>
											</div>

											<div className='filter'>
												<SelectContainer
													name='sort-order'
													labelText='Sort'
													id='sort-order-select'
													value={sortOrder}
													onChange={(e) =>
														setSortOrder(e.target.value as SortOrder)
													}
												>
													<SelectContainerItem
														value='asc'
														text='Ascending'
													/>
													<SelectContainerItem
														value='desc'
														text='Descending'
													/>
												</SelectContainer>
											</div>
										</div>

										<div className='group'>
											<Input
												name='search'
												id='search-input'
												placeholder='Wanna search something?'
												onChange={(e) => setQuery(e.target.value)}
											/>

											<Button text='&#8594;' type='submit' />
										</div>
									</form>
								</section>

								{sortedTodos.length === 0 && (
									<div id='todos-empty'>
										<p>
											There was a hole here.
											<br /> Do you want it gone?
										</p>
									</div>
								)}

								<section id='todo-list'>
									{sortedTodos.map((todo) => (
										<TodoItem
											id={todo.id}
											key={todo.id}
											title={todo.title}
											detail={
												todo.detail.length === 0
													? 'No detail provided'
													: todo.detail
											}
											timestamp={todo.timestamp}
											onClose={(id) => onDelete(id)}
											onEdit={(id) => onEdit(id)}
											onComplete={(id) => onComplete(id)}
											done={todo.done}
										/>
									))}
								</section>

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
