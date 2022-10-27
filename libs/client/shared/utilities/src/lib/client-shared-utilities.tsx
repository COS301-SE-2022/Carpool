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

export const getTimeOfDay = (date: string) => {
  const dateObj = new Date(date);
  const hour = dateObj.getHours();
  if (hour < 12) {
    return 'Morning';
  } else if (hour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

export const getMonthName = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const monthNames = [
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
  return `${monthNames[month]}`;
};

export const distance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: string
) => {
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist = dist * 1.609344;
  }
  if (unit === 'N') {
    dist = dist * 0.8684;
  }
  return dist;
};

export const calcCrow = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const latitude1 = toRad(lat1);
  const latitude2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(latitude1) *
      Math.cos(latitude2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

// Converts numeric degrees to radians
function toRad(Value: number) {
  return (Value * Math.PI) / 180;
}
