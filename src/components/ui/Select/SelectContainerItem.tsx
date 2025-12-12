interface SelectContainerItemProps {
	value: string;
	text: string;
}

export function SelectContainerItem({ value, text }: SelectContainerItemProps) {
	return (
		<>
			<option value={value}>{text}</option>
		</>
	);
}
