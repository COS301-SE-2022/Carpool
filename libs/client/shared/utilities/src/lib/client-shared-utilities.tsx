export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${day} ${monthNames[month]} ${year}`;
};

export const getTime = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export const getDay = (date: string) => {
  const dateObj = new Date(date);
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return `${weekDays[dateObj.getDay()]}`;
};

export const formatDateFull = (date: string) => {
  const dateObj = new Date(date);

  const day = `${dateObj.getDate()}`;
  const month = `${dateObj.getMonth() + 1}`;
  const year = dateObj.getFullYear();

  return `${day.length === 1 ? `0${day}` : day}/${
    month.length === 1 ? `0${month}` : month
  }/${year}`;
};

export const colors = {
  blue: '#188AED',
  black: '#000',
  white: '#fff',
  grey: '#808080',
  lightGrey: '#F1F1F1',
};
