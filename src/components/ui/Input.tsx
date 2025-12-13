interface InputProps {
	type?: string;
	className?: string;
	name?: string | undefined;
	id?: string;
	labelText?: string | null;
	placeholder?: string;
}

export function Input({
	type = 'text',
	labelText = null,
	className = 'primary',
	name,
	id,
	placeholder = '',
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
				{...props}
			/>
		</>
	);
}
