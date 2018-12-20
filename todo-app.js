const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false
};

renderTodos(todos, filters);

// Listen for new todo creation
// document.querySelector("#add-todo").addEventListener("click", function(e) {
//   console.log("Add a new todo...");
// });

document.querySelector("#search-text").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document
  .querySelector("#new-todo-form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    todos.push({
      id: uuidv4(),
      text: e.target.elements.text.value,
      completed: false
    });

    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.text.value = "";
  });

document
  .querySelector("#hide-completed")
  .addEventListener("change", function(e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });
