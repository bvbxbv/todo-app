import "./scss/main.scss";

const todoList = document.getElementById("todo-list");

function clampString(input: string, chLimit = 80): string {
  return input.substring(0, chLimit) + (input.length > chLimit ? "..." : "");
}

if (todoList !== null) {
  for (let i = 0; i < 6; i++) {
    todoList.innerHTML += `
		<div class="todo-item">
										<div class="row">
											<div class="__title">
											<span>
												Lorem ipsum dolor, sit amet consectetur adipisicing
												elit. Incidunt, vitae? Quisquam rerum cum tenetur
												neque quas distinctio voluptatem. Minima veniam
												accusantium tempora cumque deserunt ea sit atque
												sapiente iusto provident.
		</span>
																								<button class="icon">
	[X]
												</button>
											</div>
											<div class="__description">
												Lorem ipsum dolor sit, amet consectetur adipisicing
												elit. Voluptatem esse nulla aperiam architecto
												temporibus recusandae laborum saepe tenetur! Non,
												nihil exercitationem neque ullam iusto eaque libero
												praesentium est laboriosam dolore?
											</div>
										</div>

										<div class="row">
											<div class="__timestamp">22.02.2004</div>

											<div class="__controls">
												<button class="icon">
													[edit]
												</button>

												<button class="icon">
	[complete]
												</button>
											</div>
										</div>
									</div>`;
  }
}
