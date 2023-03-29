const numberFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}
