import { CalendarItem as CalendarItemType } from '../types/calendar';

interface CalendarItemProps {
	item: CalendarItemType;
	onClick: (number: number) => void;
	isActive: boolean;
}

export function CalendarItem({ item, onClick, isActive }: CalendarItemProps) {
	return (
		<div
			className={isActive ? 'day active' : 'day'}
			key={item.id}
			onClick={() => onClick(item.number)}
		>
			{item.number}
		</div>
	);
}
