export const firstLetterUppercase = (str: string): string => {
  return `${str[0].toUpperCase()}${str.slice(1, str.length).toLowerCase()}`;
}

export const allFirstLettersToUppercase = (str: string) => {
  return str.split(" ").map(st => firstLetterUppercase(st)).join(" ");
}