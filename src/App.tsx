import './scss/main.scss';
import { Calendar } from './components/Calendar';
import { StatsContainer } from './components/stats/StatsContainer';
import { TodoItem } from './components/TodoItem';
import { StatsContainerItem } from './components/stats/StatsContainerItem';
import { useEffect, useState } from 'react';
import { CalendarData, CalendarItem } from './types/calendar';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { SelectContainer } from './components/ui/Select/SelectContainer';
import { SelectContainerItem } from './components/ui/Select/SelectContainerItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { AddTodoForm } from './components/forms/AddTodoForm';
import { TodoFormData } from './types/forms';
import { addTodo } from './store/todoSlice';
import { formatDate } from './utils/date';

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
		const detail = data.description?.length === 0 ? 'No detail provided' : data.description;
		dispatch(
			addTodo({
				id: crypto.randomUUID(),
				title: data.title,
				detail: detail ?? '',
				timestamp: formatDate(new Date()),
				done: false,
			}),
		);
	};

	const [filterName, setFilterName] = useState('all');
	const [sortOrder, setSortOrder] = useState('asc');
	const [query, setQuery] = useState('');

	const sortedTodos = [...todos]
		.sort((a, b) => {
			if (sortOrder === 'asc') {
				return a.title.localeCompare(b.title);
			}
			return b.title.localeCompare(a.title);
		})
		.filter((todo) => {
			if (!query) return true;

			const _query = query.toLowerCase();
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
	return (
		<>
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
													onChange={(e) => setFilterName(e.target.value)}
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
													onChange={(e) => setSortOrder(e.target.value)}
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
											key={todo.id}
											title={todo.title}
											detail={todo.detail}
											timestamp={todo.timestamp}
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
			;
		</>
	);
}
