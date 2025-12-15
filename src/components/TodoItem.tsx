interface TodoItemProps {
	id: string;
	title: string;
	detail: string;
	timestamp: string;
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
}: TodoItemProps) {
	return (
		<>
			<div className='todo-item'>
				<div className='row'>
					<div className='__title'>
						<span>{title}</span>
						<button className='icon' onClick={() => onClose(id)}>
							[X]
						</button>
					</div>
					<div className='__description'>{detail}</div>
				</div>

				<div className='row'>
					<div className='__timestamp'>{timestamp}</div>

					<div className='__controls'>
						<button className='icon' onClick={() => onEdit(id)}>
							[edit]
						</button>

						<button className='icon' onClick={() => onComplete(id)}>
							[complete]
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
