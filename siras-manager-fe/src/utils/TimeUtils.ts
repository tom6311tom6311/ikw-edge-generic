const timestampToHourAndMin = (timestamp: number) => {
  const time = new Date(timestamp * 1000);
  return `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
};

const timestampToDate = (timestamp: number) => {
  const time = new Date(timestamp * 1000);
  return `${time.getMonth() + 1}/${String(time.getDate()).padStart(2, '0')}`;
};

export default {
  timestampToHourAndMin,
  timestampToDate,
};
