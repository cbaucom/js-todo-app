import uuidv4 from "uuid/v4";

// Setup the empty todos array
let todos = [];

// Fetch existing todos from localStorage
// Arguments: none
// Return value: none
const loadTodos = () => {
  // Check for existing saved data
  const todosJSON = localStorage.getItem("todos");

  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// Save the todos to localStorage
// Arguments: none
// Return value: none
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos;

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = text => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false
  });
  saveTodos();
};

// Remove a todo from the list
// Arguments: id of todo to remove
// Return value: none
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
  saveTodos();
};

// Toggle the completed value for a given todo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
  saveTodos();
};

// Make sure to call loadTodos and setup the exports
loadTodos();

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo };
