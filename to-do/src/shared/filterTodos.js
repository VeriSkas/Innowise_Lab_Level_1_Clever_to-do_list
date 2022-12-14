export const filterTodosByDate = (todos, date) => {
  const dateString = new Date(date).toLocaleDateString();

  return todos.filter((todo) => todo.date.toLocaleDateString() === dateString);
};
