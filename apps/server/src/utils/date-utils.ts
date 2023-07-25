const months = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export const parseMonthByName = (month: string): number => {
  const monthIndex = months.indexOf(month.toUpperCase());
  return monthIndex;
}