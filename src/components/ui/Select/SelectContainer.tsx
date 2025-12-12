import React from 'react';

interface SelectContainerProps {
	name: string;
	labelText: string;
	className?: string | undefined;
	id: string;
	children: React.ReactNode;
}

export function SelectContainer({
	name,
	labelText,
	className = 'primary',
	id,
	children,
}: SelectContainerProps) {
	return (
		<>
			<label htmlFor={id}>{labelText}</label>

			<select className={className} name={name} id={id}>
				{children}
			</select>
		</>
	);
}
