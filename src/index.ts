import "./scss/main.scss";

const todoList = document.getElementById("todo-list");

if (todoList !== null) {
  for (let i = 0; i < 24; i++) {
    todoList.innerHTML += `
		<div class="todo-item">
										<div class="group">
											<div class="__content">
												<div class="group">
													<div class="__title">
														<span
															>> Lorem ipsum dolor sit amet,
															consectetur adipisicing elit. Doloremque
															sit tenetur voluptatum ratione ab qui
															soluta fugiat vitae cumque officia
															maiores iste enim dolorum, odio sed
															ullam est possimus iure!</span
														>
													</div>
													<div class="__controls">
														<button>
															<i class="ti ti-edit"></i>
														</button>

														<button>
															<i class="ti ti-check"></i>
														</button>

														<button>
															<i class="ti ti-trash"></i>
														</button>
													</div>
												</div>
												<div class="__description">
													Lorem, ipsum dolor sit amet consectetur
													adipisicing elit. Velit earum iste ad fugiat
													dicta, libero iure perspiciatis facilis amet
													minus consequatur perferendis autem, ullam
													praesentium. Ratione aut consectetur autem a.
												</div>
											</div>
										</div>

										<div class="__timestamp">
											========================[22.02.2004]========================
										</div>
									</div>`;
  }
}
