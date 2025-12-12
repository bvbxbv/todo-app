import './scss/main.scss';
import { Calendar } from './components/Calendar';
import { StatsContainer } from './components/Stats/StatsContainer';
import { TodoItem } from './components/TodoItem';
import { StatsContainerItem } from './components/Stats/StatsContainerItem';
import { useEffect, useState } from 'react';
import { CalendarData, CalendarItem } from './types/calendar';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { SelectContainer } from './components/ui/Select/SelectContainer';
import { SelectContainerItem } from './components/ui/Select/SelectContainerItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { addTodo } from './app/todoSlice';

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

	useEffect(() => {}, []);

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
							type='text'
							className='primary'
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
								<form action=''>
									<Input
										type='text'
										className='primary'
										name='task-title'
										id='task-title-input'
										placeholder='what about title?'
									/>

									<Input
										type='text'
										className='primary'
										name='task-description'
										id='task-description-input'
										placeholder='little bit of details...'
									/>

									<Button
										text='&#8594;'
										onClick={() =>
											dispatch(
												addTodo({
													id: crypto.randomUUID(),
													title: 'qwe',
													detail: 'qwe',
													timestamp: 'qwe',
													done: false,
												}),
											)
										}
									/>
								</form>
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
												>
													<SelectContainerItem
														value='category'
														text='By category'
													/>
													<SelectContainerItem
														value='name'
														text='By name'
													/>
													<SelectContainerItem
														value='date'
														text='By date'
													/>
												</SelectContainer>
											</div>

											<div className='filter'>
												<SelectContainer
													name='sort-order'
													labelText='Sort'
													id='sort-order-select'
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
												type='text'
												className='primary'
												name='search'
												id='search-input'
												placeholder='Wanna search something?'
											/>

											<Button text='&#8594;' type='submit' />
										</div>
									</form>
								</section>

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
