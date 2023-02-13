export const filterTodosByDate = (todos, date) => {
  const dateString = new Date(date).toLocaleDateString();

  return todos.filter((todo) => {
    return new Date(todo.date).toLocaleDateString() === dateString;
  });
};
