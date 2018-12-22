import { getTodos, toggleTodo, removeTodo } from "./todos";
import { getFilters } from "./filters";

// Render application todos based on filters
// Arguments: none
// Return value: none
const renderTodos = () => {
  const todoEl = document.querySelector("#todos");
  const { searchText, hideCompleted } = getFilters();
  const filteredTodos = getTodos().filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  document.querySelector("#todos").innerHTML = "";

  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      document.querySelector("#todos").appendChild(generateTodoDOM(todo));
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No to-dos to show";
    todoEl.appendChild(emptyMessage);
  }
};

// Get the DOM elements for each todo
// Arguments: todo
// Return value: the todo element
const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeBtn = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text
  if (todo.text.length > 0) {
    todoText.textContent = todo.text;
  } else {
    todoText.textContent = "Unnamed todo :/";
  }
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeBtn.textContent = "remove";
  removeBtn.classList.add("button", "button--text");
  todoEl.appendChild(removeBtn);
  removeBtn.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// Get the DOM elements for list summary
// Arguments: incompletedTodos
// Return value: the summary element
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};

// Make sure to set up the exports
export { renderTodos, generateTodoDOM, generateSummaryDOM };
