import React from 'react';

interface ButtonProps {
	className?: string | undefined;
	type?: 'button' | 'submit' | 'reset' | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	id?: string | undefined;
	text: string;
}

export function Button({
	className = 'primary',
	type = 'button',
	onClick = undefined,
	text,
	id,
}: ButtonProps) {
	return (
		<>
			<button className={className} type={type} onClick={onClick} id={id}>
				{text}
			</button>
		</>
	);
}
