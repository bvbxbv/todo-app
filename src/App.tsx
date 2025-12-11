import { Calendar } from "./components/Calendar";
import { TodoItem } from "./components/TodoItem";
import "./scss/main.scss";
export function App() {
  const calendar = {
    title: "10, December 2025",
    items: [
      { id: 0, number: 0, completed: false },
      { id: 1, number: 1, completed: false },
      { id: 2, number: 2, completed: false },
      { id: 3, number: 3, completed: false },
      { id: 4, number: 4, completed: false },
      { id: 5, number: 5, completed: false },
      { id: 6, number: 6, completed: false },
      { id: 7, number: 7, completed: false },
      { id: 8, number: 8, completed: false },
      { id: 9, number: 9, completed: false },
      { id: 10, number: 10, completed: false },
      { id: 10, number: 11, completed: false },
      { id: 12, number: 12, completed: false },
      { id: 13, number: 13, completed: false },
      { id: 14, number: 14, completed: false },
      { id: 15, number: 15, completed: false },
      { id: 16, number: 16, completed: false },
      { id: 17, number: 17, completed: false },
      { id: 18, number: 18, completed: false },
      { id: 19, number: 19, completed: false },
      { id: 20, number: 20, completed: false },
      { id: 21, number: 21, completed: false },
      { id: 22, number: 22, completed: false },
      { id: 23, number: 23, completed: false },
      { id: 24, number: 24, completed: false },
      { id: 25, number: 25, completed: false },
      { id: 26, number: 26, completed: false },
      { id: 27, number: 27, completed: false },
      { id: 28, number: 28, completed: false },
      { id: 29, number: 29, completed: false },
      { id: 30, number: 30, completed: false },
      { id: 31, number: 31, completed: false },
    ],
  };
  return (
    <>
      <header id="page-header">
        <div className="__content">
          Hello <span id="header-username">%username%</span>! Ready to planning?
        </div>
      </header>
      <div id="page-container">
        <aside id="page-sidebar">
          {/* calendar */}
          <Calendar calendar={calendar} />
          <section id="stats">
            <div className="stat">
              <div className="__title">Completed:</div>
              <div className="__value">0</div>
            </div>

            <div className="stat">
              <div className="__title">Pending:</div>
              <div className="__value">0</div>
            </div>
          </section>

          <section id="change-username">
            <label htmlFor="change-username-input">
              Well, your new name is:
            </label>
            <input
              type="text"
              className="primary"
              name="change-username"
              id="change-username-input"
              placeholder="> "
            />
          </section>
        </aside>

        <main id="page-content">
          <div className="__content">
            <section id="todos">
              <div className="__title">
                <form action="">
                  <input
                    className="primary"
                    type="text"
                    name="task-title"
                    id="task-title-input"
                    placeholder="what about title?"
                  />
                  <input
                    className="primary"
                    type="text"
                    name="task-description"
                    id="task-description-input"
                    placeholder="little bit of details..."
                  />

                  <button className="primary" type="submit">
                    -&gt;
                  </button>
                </form>
              </div>

              <div className="__content">
                <section id="filters">
                  <form action="">
                    <div className="group">
                      <div className="filter">
                        <label htmlFor="filter-name">Filter</label>

                        <select
                          className="primary"
                          name="filter-name"
                          id="filter-name-select"
                        >
                          <option value="category">By category</option>
                          <option value="name">By name</option>
                          <option value="date">By date</option>
                        </select>
                      </div>

                      <div className="filter">
                        <label htmlFor="sort-order">Sort</label>

                        <select
                          className="primary"
                          name="sort-order"
                          id="sort-order-select"
                        >
                          <option value="asc">by ASC</option>
                          <option value="desc">by DESC</option>
                        </select>
                      </div>
                    </div>

                    <div className="group">
                      <input
                        className="primary"
                        type="search"
                        name="search"
                        id="search-input"
                        placeholder="Wanna search something?"
                      />

                      <button className="primary" type="submit">
                        -&gt;
                      </button>
                    </div>
                  </form>
                </section>

                <section id="todo-list">
                  <TodoItem />
                  <TodoItem />
                  <TodoItem />
                  <TodoItem />
                  <TodoItem />
                </section>

                <section id="load-more">
                  <button className="primary" id="load-more-button">
                    Load more
                  </button>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
      ;
    </>
  );
}
