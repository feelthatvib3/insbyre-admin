export function formatPrice(price: number) {
  const priceFormat = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'code',
    maximumFractionDigits: 0
  });
  return priceFormat.format(price);
}
