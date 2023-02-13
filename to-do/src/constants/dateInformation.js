export const weekDays = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

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
