interface TodoItemProps {
	title: string;
	detail: string;
	timestamp: string;
}

export function TodoItem({ title, detail, timestamp }: TodoItemProps) {
	return (
		<>
			<div className='todo-item'>
				<div className='row'>
					<div className='__title'>
						<span>{title}</span>
						<button className='icon'>[X]</button>
					</div>
					<div className='__description'>{detail}</div>
				</div>

				<div className='row'>
					<div className='__timestamp'>{timestamp}</div>

					<div className='__controls'>
						<button className='icon'>[edit]</button>

						<button className='icon'>[complete]</button>
					</div>
				</div>
			</div>
		</>
	);
}
