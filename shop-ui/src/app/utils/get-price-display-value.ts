export const getPriceDisplayValue = (price: number | string): string => {
  const fixedNum = Number(price).toFixed(2);
  const parts = fixedNum.split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return "$ " + parts.join(".");
};
