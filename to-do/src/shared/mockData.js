export const MockTodos = {
  // Не забыть про id пользователя!
  todos: [
    {
      id: 1,
      date: new Date(),
      completed: true,
      text: 'Bla bla bla',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 2,
      date: new Date(),
      completed: true,
      text: 'Text text',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 3,
      date: new Date(),
      completed: false,
      text: 'Text',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 4,
      date: new Date(),
      completed: true,
      text: 'I don`t know',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 5,
      date: new Date(),
      completed: false,
      text: 'Text',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 6,
      date: new Date(),
      completed: false,
      text: 'Text',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 7,
      date: new Date(),
      completed: true,
      text: 'I don`t know',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 8,
      date: new Date(),
      completed: false,
      text: 'Text',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 9,
      date: new Date(),
      completed: false,
      text: 'Text',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 10,
      date: new Date(),
      completed: true,
      text: 'I don`t know',
      createDate: new Date('2022-12-14'),
    },
    {
      id: 11,
      date: new Date(),
      completed: false,
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard',
      createDate: new Date('2022-12-14'),
    },
  ],
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const calendarArray = (year, month) => {
  let count = 0;

  return [...Array(daysInMonth(year, month))].map(() => {
    const startDate = new Date(year, month, 1);
    let date = startDate.setDate(startDate.getDate() + count);

    count++;

    return date;
  });
};

export const daysInMonth = (year, month) => {
  return 33 - new Date(year, month, 33).getDate();
};
