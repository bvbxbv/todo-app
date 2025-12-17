import { CalendarProps } from '../types/calendar';
import { CalendarItem } from './CalendarItem';

export function Calendar({ calendar, onClick, activeDay }: CalendarProps) {
	return (
		<>
			<section id='calendar'>
				<div className='__title'>{calendar.title}</div>

				<div className='__content'>
					{calendar.items.map((item) => {
						return CalendarItem({ item, onClick, isActive: activeDay === item.number });
					})}
				</div>
			</section>
		</>
	);
}
