export const MockTodos = {
  todos: [
    {
      id: 1,
      date: new Date(),
      completed: true,
      value: 'Bla bla bla',
    },
    {
      id: 2,
      date: new Date(),
      completed: true,
      value: 'Text text',
    },
    {
      id: 3,
      date: new Date(),
      completed: false,
      value: 'Text',
    },
    {
      id: 4,
      date: new Date(),
      completed: true,
      value: 'I don`t know',
    },
    {
      id: 5,
      date: new Date(),
      completed: false,
      value: 'Text',
    },
  ],
};

export const calendarArray = () => {
  let count = 0;

  return [...Array(31)].map(() => {
    const todayDate = new Date();
    let date = todayDate.setDate(todayDate.getDate() + count);

    count++;

    return date;
  });
};
