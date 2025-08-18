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
  if (typeof num === 'number') {
    num = new Decimal(num);
  }

  if (!(num instanceof Decimal)) {
    num = new Decimal(num);
  }

  // Для очень маленьких чисел
  if (num.lt(0.001) && num.gt(0)) {
    return num.toExponential(2)
  }

  // Для чисел меньше 1000
  if (num.lt(1000)) {
    return num.toFixed(0);
  }

  // Для экспоненциально больших чисел (больше 10^300)
  if (num.gte(Decimal.pow(10, 300))) {
    return num.toExponential(2);
  }

  // Обычное форматирование с суффиксами
  let tier = Math.floor(Math.log10(num.toNumber()) / 3);

  if (tier >= suffixes.length) {
    // Если число слишком большое для наших суффиксов
    return num.toExponential(2);
  }

  let suffix = suffixes[tier];
  let scale = Math.pow(10, tier * 3);
  let scaled = num.div(scale);

  let precision = scaled.gte(100) ? 0 : scaled.gte(10) ? 1 : 2;

  return scaled.toFixed(precision) + suffix;
}

// Для игровых ресурсов - показываем больше деталей для маленьких чисел
export function formatResource(num) {
  if (typeof num === 'number') {
    num = new Decimal(num);
  }

  if (!(num instanceof Decimal)) {
    num = new Decimal(num);
  }

  if (num.lt(1)) {
    return num.toFixed(2);
  } else if (num.lt(10)) {
    return num.toFixed(1);
  } else {
    return formatNumber(num);
  }
}

export function formatEnergy(num) {
    if (num.lt(10)) {
    return num.toFixed(2);
  } else if (num.lt(100)) {
    return num.toFixed(1);
  } else if (num.gte(1e15)) {
    return formatNumber(num);
  }

  const number = num.toNumber();

  return number.toLocaleString(localStorage.getItem('locale') === 'ru' ? 'ru-RU' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export { Decimal };
