interface InputProps {
	type: string;
	className: string;
	name: string;
	id: string;
	labelText?: string | null;
	placeholder: string;
}

export function Input({ type, labelText = null, className, name, id, placeholder }: InputProps) {
	return (
		<>
			{labelText !== null && <label htmlFor={id}>{labelText}</label>}
			<input
				type={type}
				className={className}
				name={name}
				placeholder={placeholder}
				id={id}
			/>
		</>
	);
}
