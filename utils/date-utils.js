export const getMidnight = time => {
  if (!time) {
    time = new Date();
  }
  time = new Date(time);

  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getYear() + 1900;
  return new Date(year, month, date);
};

export const getNextMidnight = time => {
  if (!time) {
    time = new Date();
  }
  time = new Date(time);

  const date = time.getDate() + 1;
  const month = time.getMonth();
  const year = time.getYear() + 1900;
  return new Date(year, month, date);
};
