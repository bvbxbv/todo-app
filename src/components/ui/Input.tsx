import { ChangeEvent } from 'react';

interface InputProps {
	type?: string;
	className?: string;
	name?: string | undefined;
	id?: string;
	labelText?: string | null;
	placeholder?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
	type = 'text',
	labelText = null,
	className = 'primary',
	name,
	id,
	placeholder = '',
	onChange,
	...props
}: InputProps) {
	return (
		<>
			{labelText !== null && <label htmlFor={id}>{labelText}</label>}
			<input
				type={type}
				className={className}
				name={name}
				placeholder={placeholder}
				id={id}
				onChange={(e) => {
					if (onChange === undefined) {
						return;
					}
					onChange(e);
				}}
				{...props}
			/>
		</>
	);
}
