function toCents(amount: number): number {
  return amount * 100;
}

function toMoney(amount: number): number {
  return amount / 100;
}

export const currencyConverter = {
  toMoney,
  toCents,
};
