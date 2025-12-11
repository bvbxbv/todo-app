export function TodoItem() {
	return (
		<>
			<div className="todo-item">
				<div className="row">
					<div className="__title">
						<span>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt,
							vitae? Quisquam rerum cum tenetur neque quas distinctio voluptatem.
							Minima veniam accusantium tempora cumque deserunt ea sit atque sapiente
							iusto provident.
						</span>
						<button className="icon">[X]</button>
					</div>
					<div className="__description">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem esse
						nulla aperiam architecto temporibus recusandae laborum saepe tenetur! Non,
						nihil exercitationem neque ullam iusto eaque libero praesentium est
						laboriosam dolore?
					</div>
				</div>

				<div className="row">
					<div className="__timestamp">22.02.2004</div>

					<div className="__controls">
						<button className="icon">[edit]</button>

						<button className="icon">[complete]</button>
					</div>
				</div>
			</div>
		</>
	);
}
