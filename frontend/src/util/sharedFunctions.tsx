export const formatDate = (postedAt: string) => {
  const date = new Date(postedAt);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Pad single-digit day and month with leading zeros
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};
