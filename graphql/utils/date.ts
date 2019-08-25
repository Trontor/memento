export const get24HoursFromNow = (): Date => {
  return new Date(Date.now() + 60 * 60 * 24 * 1000);
};
