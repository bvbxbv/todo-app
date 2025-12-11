interface StatsContainerItemProps {
	title: string;
	value: any;
}

export function StatsContainerItem({ title, value }: StatsContainerItemProps) {
	return (
		<>
			<div className="stat">
				<div className="__title">{title}</div>
				<div className="__value">{value}</div>
			</div>
		</>
	);
}
