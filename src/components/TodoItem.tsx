import { useState } from 'react';

interface TodoItemProps {
	id: string;
	title: string;
	detail: string;
	timestamp: string;
	done: boolean;
	onEdit: (id: string) => void;
	onComplete: (id: string) => void;
	onClose: (id: string) => void;
}

export function TodoItem({
	id,
	title,
	detail,
	timestamp,
	onEdit,
	onComplete,
	onClose,
	done: completed,
}: TodoItemProps) {
	const [closed, setClosed] = useState(false);

	return (
		<>
			<div
				className={
					'todo-item' + (completed ? ' completed' : '') + (closed ? ' closed' : '')
				}
			>
				<div className='row'>
					<div className='__title'>
						<span>{title}</span>
						<button
							className='icon'
							onClick={() => {
								setClosed(true);
								setTimeout(() => {
									onClose(id);
								}, 150);
							}}
						>
							[X]
						</button>
					</div>
					<div className='__description'>{detail}</div>
				</div>

				<div className='row'>
					<div className='__timestamp'>{timestamp}</div>

					<div className='__controls'>
						<button className='icon' onClick={() => onEdit(id)} disabled={completed}>
							[edit]
						</button>

						<button
							className='icon'
							onClick={() => onComplete(id)}
							disabled={completed}
						>
							[complete]
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
