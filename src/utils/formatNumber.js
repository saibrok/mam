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
  // Если это число, преобразуем в Decimal
  if (typeof num === 'number') {
    num = new Decimal(num);
  }
  // Если это строка, пытаемся преобразовать в Decimal
  if (!(num instanceof Decimal)) {
    num = new Decimal(num);
  }

  // Для очень маленьких чисел
  if (num.lt(0.001) && num.gt(0)) {
    return num.toExponential(2);
  }

  // Для чисел меньше 10
  if (num.lt(10)) {
    return num.toFixed(4);
  }

  // Для чисел меньше 100
  if (num.lt(100)) {
    return num.toFixed(3);
  }

  // Для чисел меньше 1000
  if (num.lt(1000)) {
    return num.toFixed(2);
  }

  // Для чисел меньше 10000
  if (num.lt(10000)) {
    return num.toFixed(1);
  }

  // Для экспоненциально больших чисел (больше 10^300)
  if (num.gte(Decimal.pow(10, 300))) {
    return num.toExponential(2);
  }

  // Для чисел больше 1e15 — используем суффиксы
  if (num.gte(1e18)) {
    let tier = Math.floor(Math.log10(num.toNumber()) / 3);
    if (tier >= suffixes.length) {
      return num.toExponential(2);
    }
    let suffix = suffixes[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = num.div(scale);
    let precision = scaled.gte(100) ? 0 : scaled.gte(10) ? 1 : 2;
    return scaled.toFixed(precision) + suffix;
  }

  // Для остальных — локализованное целое число
  const number = num.toNumber();
  return number.toLocaleString(localStorage.getItem('locale') === 'ru' ? 'ru-RU' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export { Decimal };
