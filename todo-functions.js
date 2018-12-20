// Fetch existing todos from localStorage
const getSavedTodos = function() {
  // Check for existing saved data
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save the todos to localStorage
const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Render application todos based on filters
const renderTodos = function(todos, filters) {
  const filteredTodos = todos.filter(function(todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function(todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(todo => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Remove a todo from the list
const removeTodo = function(id) {
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
const toggleTodo = function(id) {
  const todo = todos.find(function(todo) {
    return todo.id === id;
  });

  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

// Get the DOM elements for each todo
const generateTodoDOM = function(todo) {
  const todoEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const textEl = document.createElement("span");
  const removeBtn = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener("change", function() {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup the todo text
  if (todo.text.length > 0) {
    textEl.textContent = todo.text;
  } else {
    textEl.textContent = "Unnamed todo :/";
  }
  todoEl.appendChild(textEl);

  // Setup the remove button
  removeBtn.textContent = "x";
  todoEl.appendChild(removeBtn);
  removeBtn.addEventListener("click", function() {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });
  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
