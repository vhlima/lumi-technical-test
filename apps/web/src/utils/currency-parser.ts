export const parseToBRL = (n: number) => {
  const integerPart = n;
  return `R$ ${integerPart.toFixed(2).replace('.', ',')}`;
}