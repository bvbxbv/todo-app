import { CalendarProps } from '../types/calendar';

export function Calendar({ calendar, onClick }: CalendarProps) {
	return (
		<>
			<section id='calendar'>
				<div className='__title'>{calendar.title}</div>

				<div className='__content'>
					{calendar.items.map((item) => (
						<div
							className={item.completed ? 'day completed' : 'day'}
							key={item.id}
							onClick={() => onClick(item.number)}
						>
							{item.number}
						</div>
					))}
				</div>
			</section>
		</>
	);
}
