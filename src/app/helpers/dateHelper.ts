export const MONTH = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const YEARS = [2020, 2021, 2022, 2023];

export function getToday() {
  return '2020-10-17';
}

export function formatMonth(isoDate: string) {
  const [year, month] = isoDate.split('-');
  return `${MONTH[parseInt(month) - 1]} de ${year}`;
}

export function addMonths(month: string, increment: number) {
  const jsDate = new Date(month + '-01T12:00:00');
  jsDate.setMonth(jsDate.getMonth() + increment);
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
}
