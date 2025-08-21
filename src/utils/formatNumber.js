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

// Базовые суффиксы (горизонталь) для степеней от 10^0 до 10^33
const baseSuffixes = [
  '', // 10^0
  'K', // 10^3 (тысяча)
  'M', // 10^6 (миллион)
  'B', // 10^9 (миллиард)
  'T', // 10^12 (триллион)
  'Qa', // 10^15 (квадриллион)
  'Qi', // 10^18 (квинтиллион)
  'Sx', // 10^21 (секстиллион)
  'Sp', // 10^24 (септиллион)
  'Oc', // 10^27 (октиллион)
  'No', // 10^30 (нониллион)
  'Dc', // 10^33 (дециллион)
];

// Дополнительные суффиксы (вертикаль) для уровней до 10^999
const levelSuffixes = [
  '', // 10^0 (базовый уровень)
  'Vg', // 10^33 (вигинтиллион)
  'Tg', // 10^66 (тревигинтиллион)
  'Qd', // 10^99 (квадрагинтиллион)
  'Qt', // 10^132 (квинтвигинтиллион)
  'Qv', // 10^165 (квинквагинтиллион)
  'Sv', // 10^198 (септвигинтиллион)
  'Ov', // 10^231 (октовигинтиллион)
  'Nv', // 10^264 (ноновигинтиллион)
  'Ctg', // 10^297 (центумвигинтиллион)
  'Cqd', // 10^330 (центумквадрагинтиллион)
  'Cqt', // 10^363 (центумквинтвигинтиллион)
  'Cqv', // 10^396 (центумквинквагинтиллион)
  'Csv', // 10^429 (центумсептвигинтиллион)
  'Cov', // 10^462 (центумоктовигинтиллион)
  'Cnv', // 10^495 (центумноновигинтиллион)
  'Cdc', // 10^528 (центумдециллион)
  'Udc', // 10^561 (ундециллион)
  'Ddc', // 10^594 (дуодециллион)
  'Tdc', // 10^627 (тредециллион)
  'Qadc', // 10^660 (квадрадециллион)
  'Qidc', // 10^693 (квинтдециллион)
  'Sxdc', // 10^726 (секстдециллион)
  'Spdc', // 10^759 (септдециллион)
  'Odc', // 10^792 (октодециллион)
  'Ndc', // 10^825 (нонодециллион)
  'Ctdc', // 10^858 (центумтредециллион)
  'Cqdc', // 10^891 (центумквадрадециллион)
  'Cgidc', // 10^924 (центумквинтдециллион)
  'Csxdc', // 10^957 (центумсекстдециллион)
  'Cspdc', // 10^990 (центумсептдециллион)
  'Ggl', // 10^999 (гугол-дециллион)
];

// Функция для преобразования множителя Ggl в компактный суффикс
// function getGglPrefix(gglCount) {
//   const gglCountDecimal = new Decimal(gglCount);
//   if (gglCountDecimal.lt(3)) {
//     return 'Ggl'.repeat(gglCountDecimal.toNumber());
//   }

//   const baseIndex = gglCountDecimal.div(3).floor();
//   const baseRemainder = gglCountDecimal.mod(3);
//   if (baseIndex.lt(baseSuffixes.length)) {
//     let prefix = 'Ggl' + baseSuffixes[baseIndex.toNumber()];
//     if (baseRemainder.gt(0)) {
//       prefix = 'Ggl'.repeat(baseRemainder.toNumber()) + prefix;
//     }
//     return prefix;
//   }

//   // Для очень больших gglCount используем формат 'Ggl^'
//   return `Ggl^${gglCountDecimal.toString()}`;
// }

// // Функция для получения суффикса по степени
// function getSuffix(power) {
//   // Конвертируем power в Decimal для точной работы с большими числами
//   const powerDecimal = new Decimal(power);
//   if (powerDecimal.eq(0)) return '';
//   // if (powerDecimal.lt(0) || !powerDecimal.isInteger()) return 'Invalid';

//   // Для степеней >= 1000 используем 'Ggl' (10^999) как базовый суффикс
//   const gglPower = new Decimal(999);
//   if (powerDecimal.gte(1000)) {
//     const gglCount = powerDecimal.div(gglPower).floor(); // Сколько раз 10^999
//     const remainingPower = powerDecimal.mod(gglPower); // Остаток
//     const gglPrefix = getGglPrefix(gglCount);
//     const remainderSuffix = remainingPower.eq(0) ? '' : getSuffix(remainingPower.toNumber());
//     return gglPrefix + remainderSuffix;
//   }

//   // Для степеней < 1000 используем levelSuffixes и baseSuffixes
//   const levelSize = (baseSuffixes.length - 1) * 3; // 11 * 3 = 33
//   const level = powerDecimal.div(levelSize).floor();
//   const basePower = powerDecimal.mod(levelSize);
//   const baseIndex = basePower.div(3).floor();

//   let suffix = '';
//   if (level.gt(0)) {
//     suffix += levelSuffixes[Math.min(level.toNumber(), levelSuffixes.length - 1)];
//   }
//   if (baseIndex.gt(0) || (level.eq(0) && basePower.gte(3))) {
//     suffix += baseSuffixes[Math.min(baseIndex.toNumber(), baseSuffixes.length - 1)];
//   }

//   return suffix || '';
// }



// export function formatNumber(num) {
//   // Если это число или строка, преобразуем в Decimal
//   if (typeof num === 'number' || typeof num === 'string') {
//     num = new Decimal(num);
//   }

//   // Убедимся, что входное значение — объект Decimal
//   if (!(num instanceof Decimal)) {
//     num = new Decimal(num);
//   }

//   // Для очень маленьких чисел (< 0.001 и > 0) — экспоненциальная запись с 3 знаками
//   if (num.lt(0.001) && num.gt(0)) {
//     return num.toExponential(3);
//   }

//   // Для чисел < 10 — 2 знака после запятой
//   if (num.lt(10)) {
//     return num.toFixed(2);
//   }

//   // Для чисел < 100 — 1 знак после запятой
//   if (num.lt(100)) {
//     return num.toFixed(1);
//   }

//   // Для чисел < 10000 — 0 знаков после запятой
//   if (num.lt(10000)) {
//     return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
//   }

//   // Для экспоненциально больших чисел (≥ 10^300) — экспоненциальная запись с 3 знаками
//   // if (num.gte(Decimal.pow(10, 300))) {
//   //   return num.toExponential(3);
//   // }

//   // Для чисел ≥ 10^18 — используем суффиксы с менее резким сокращением
//   if (num.gte(1e18)) {
//     // Вычисляем уровень (tier) для выбора суффикса, используя Decimal.log10
//     let tier = num.abs().log10().div(3).floor().toNumber();

//     // Если tier превышает длину массива суффиксов, возвращаем экспоненциальную запись
//     if (tier >= 10000) {
//       return num.toExponential(3);
//     }

//     // Используем масштаб на четыре порядка меньше (tier-4), чтобы показывать больше цифр
//     let scale = Decimal.pow(10, Decimal.max(0, (tier - 4) * 3));

//     // Делим число на масштаб
//     let scaled = num.div(scale);

//     // Форматируем число без дробной части
//     let formatted = scaled.toFixed(0);

//     // Получаем суффикс для текущего уровня

//     // let suffix = suffixes[tier];
//     let suffix = getSuffix(tier * 3);

//     // Добавляем пробелы каждые 3 цифры
//     formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

//     // Возвращаем число с суффиксом
//     return `${formatted} ${suffix}`;
//   }

//   // Для остальных чисел (10000 ≤ num < 10^18) — локализованное целое число
//   const number = num.toNumber();
//   return number.toLocaleString('ru-RU', {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });
// }

// Кастомная функция форматирования для больших чисел
export function formatNumber(value) {
  if (!(value instanceof Decimal)) {
    value = new Decimal(value);
  }

  if (value.lt(1000)) {
    return value.toFixed(2);
  }

  if (value.layer === 0) {
    // Для layer 0: используем старые суффиксы для exponent <= 999
    const power = value.log10().floor().toNumber();
    const mantissa = value.div(Decimal.pow(10, power - (power % 3))).toFixed(2);
    const suffix = getSuffix(power - (power % 3)); // Используй старую getSuffix для малых
    return `${mantissa}${suffix}`;
  } else {
    // Для layer >= 1: layered exponents (двойная степень)
    // Рекурсивно форматируем mag как exponent
    const mantissa = value.sign * Math.exp(value.mag - Math.floor(value.mag)).toFixed(2);
    const exponent = formatNumber(Math.floor(value.mag));
    return `${mantissa}e${exponent}`;
  }
}

// Старая getSuffix для power < 1000 (оставляем как есть, но обрезаем до 999)
function getSuffix(power) {
  if (power < 3) return '';
  if (power >= 999) return 'Ggl'; // Граница
  const levelSize = 33;
  const level = Math.floor(power / levelSize);
  const basePower = power % levelSize;
  const baseIndex = Math.floor(basePower / 3);
  let suffix = '';
  if (level > 0) {
    suffix += levelSuffixes[Math.min(level, levelSuffixes.length - 1)];
  }
  if (baseIndex > 0) {
    suffix += baseSuffixes[baseIndex];
  }
  return suffix;
}

// Пример использования
console.log(getSuffix(57)); // 'Qa'
console.log(getSuffix(1057)); // 'Qa'
console.log(getSuffix(2057)); // 'Qa'
console.log(getSuffix(20250)); // 'Qa'

// Массивы baseSuffixes и levelSuffixes остаются теми же, что и раньше (до 'Ggl' для 10^999)

export { Decimal };
