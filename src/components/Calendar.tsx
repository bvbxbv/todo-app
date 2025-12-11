interface CalendarItem {
	id: number;
	number: number;
	completed?: boolean;
}

interface CalendarData {
	title: string;
	items: CalendarItem[];
}

interface CalendarProps {
	calendar: CalendarData;
}

export function Calendar({ calendar }: CalendarProps) {
	return (
		<>
			<section id="calendar">
				<div className="__title">{calendar.title}</div>

				<div className="__content">
					{calendar.items.map((item) => (
						<div className={item.completed ? "day completed" : "day"} key={item.id}>
							{item.number}
						</div>
					))}
				</div>
			</section>
		</>
	);
}
