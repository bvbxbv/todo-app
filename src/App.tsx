import { Calendar } from './components/Calendar';
import { StatsContainer } from './components/Stats/StatsContainer';
import { TodoItem } from './components/TodoItem';
import './scss/main.scss';
import { StatsContainerItem } from './components/Stats/StatsContainerItem';
import { useEffect, useState } from 'react';
import { CalendarData, CalendarItem } from './types/calendar';
import { Input } from './components/ui/Input';

export function App() {
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

									<button className='primary' type='submit'>
										&#8594;
									</button>
								</form>
							</div>

							<div className='__content'>
								<section id='filters'>
									<form action=''>
										<div className='group'>
											<div className='filter'>
												<label htmlFor='filter-name'>Filter</label>

												<select
													className='primary'
													name='filter-name'
													id='filter-name-select'
												>
													<option value='category'>By category</option>
													<option value='name'>By name</option>
													<option value='date'>By date</option>
												</select>
											</div>

											<div className='filter'>
												<label htmlFor='sort-order'>Sort</label>

												<select
													className='primary'
													name='sort-order'
													id='sort-order-select'
												>
													<option value='asc'>by ASC</option>
													<option value='desc'>by DESC</option>
												</select>
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

											<button className='primary' type='submit'>
												&#8594;
											</button>
										</div>
									</form>
								</section>

								<section id='todo-list'>
									<TodoItem />
									<TodoItem />
									<TodoItem />
									<TodoItem />
									<TodoItem />
								</section>

								<section id='load-more'>
									<button className='primary' id='load-more-button'>
										Load more
									</button>
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
