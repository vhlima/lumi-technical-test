const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const parseMonthByName = (month: string): number => {
  const monthIndex = months.findIndex(m => m.slice(0, 3).toUpperCase() === month.toUpperCase());
  return monthIndex;
}
export const parseMonthByIndex = (monthIndex: number): string => {
  const month = months[monthIndex];
  return month;
}

export const parseBrazilianDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export const formatDateToBrazilianTimeFormat = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get the correct month since JavaScript months are zero-based.
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}