export interface CalendarItem {
	id: number;
	number: number;
	completed?: boolean;
}

export interface CalendarData {
	title: string;
	items: CalendarItem[];
}

export interface CalendarProps {
	calendar: CalendarData;
	onClick: (dayNumber: number) => void;
	activeDay: number;
}
