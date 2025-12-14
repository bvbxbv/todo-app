import React, { ChangeEvent } from 'react';

interface SelectContainerProps {
	name: string;
	labelText: string;
	className?: string | undefined;
	id: string;
	children: React.ReactNode;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	value: string;
}

export function SelectContainer({
	name,
	labelText,
	className = 'primary',
	id,
	children,
	onChange,
	value,
}: SelectContainerProps) {
	return (
		<>
			<label htmlFor={id}>{labelText}</label>

			<select
				value={value}
				className={className}
				name={name}
				id={id}
				onChange={(e) => onChange(e)}
			>
				{children}
			</select>
		</>
	);
}
