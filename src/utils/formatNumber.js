import Decimal from 'break_eternity.js';

// Суффиксы для больших чисел
// prettier-ignore
const suffixes = [
  '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
  'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NoDc', 'Vg',
  'UVg', 'DVg', 'TVg', 'QaVg', 'QiVg', 'SxVg', 'SpVg', 'OcVg', 'NoVg', 'Tg',
  'UTg', 'DTg', 'TTg', 'QaTg', 'QiTg', 'SxTg', 'SpTg', 'OcTg', 'NoTg', 'Qd',
  'UQd', 'DQd', 'TQd', 'QaQd', 'QiQd', 'SxQd', 'SpQd', 'OcQd', 'NoQd', 'Qt',
  'UQt', 'DQt', 'TQt', 'QaQt', 'QiQt', 'SxQt', 'SpQt', 'OcQt', 'NoQt', 'Sx',
  'USx', 'DSx', 'TSx', 'QaSx', 'QiSx', 'SxSx', 'SpSx', 'OcSx', 'NoSx', 'Sp',
  'USp', 'DSp', 'TSp', 'QaSp', 'QiSp', 'SxSp', 'SpSp', 'OcSp', 'NoSp', 'Oc'
]

export function formatNumber(num) {
  // Если это число или строка, преобразуем в Decimal
  if (typeof num === 'number' || typeof num === 'string') {
    num = new Decimal(num);
  }

  // Убедимся, что входное значение — объект Decimal
  if (!(num instanceof Decimal)) {
    num = new Decimal(num);
  }

  // Для очень маленьких чисел (< 0.001 и > 0) — экспоненциальная запись с 3 знаками
  if (num.lt(0.001) && num.gt(0)) {
    return num.toExponential(3);
  }

  // Для чисел < 10 — 2 знака после запятой
  if (num.lt(10)) {
    return num.toFixed(2);
  }

  // Для чисел < 100 — 1 знак после запятой
  if (num.lt(100)) {
    return num.toFixed(1);
  }

  // Для чисел < 10000 — 0 знаков после запятой
  if (num.lt(10000)) {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // Для экспоненциально больших чисел (≥ 10^300) — экспоненциальная запись с 3 знаками
  if (num.gte(Decimal.pow(10, 300))) {
    return num.toExponential(3);
  }

  // Для чисел ≥ 10^18 — используем суффиксы с менее резким сокращением
  if (num.gte(1e18)) {
    // Вычисляем уровень (tier) для выбора суффикса, используя Decimal.log10
    let tier = num.abs().log10().div(3).floor().toNumber();

    // Если tier превышает длину массива суффиксов, возвращаем экспоненциальную запись
    if (tier >= suffixes.length) {
      return num.toExponential(3);
    }

    // Получаем суффикс для текущего уровня
    let suffix = suffixes[tier];

    // Используем масштаб на четыре порядка меньше (tier-4), чтобы показывать больше цифр
    let scale = Decimal.pow(10, Decimal.max(0, (tier - 4) * 3));

    // Делим число на масштаб
    let scaled = num.div(scale);

    // Форматируем число без дробной части
    let formatted = scaled.toFixed(6);

    // Добавляем пробелы каждые 3 цифры
    formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Возвращаем число с суффиксом
    return `${formatted} ${suffix}`;
  }

  // Для остальных чисел (10000 ≤ num < 10^18) — локализованное целое число
  const number = num.toNumber();
  return number.toLocaleString(localStorage.getItem('locale') === 'ru' ? 'ru-RU' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export { Decimal };
