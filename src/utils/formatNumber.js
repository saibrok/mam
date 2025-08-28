import Decimal from 'break_eternity.js';

// Базовые суффиксы (до 10^99)
const suffixes = [
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
  'UDc', // 10^36 (ундециллион)
  'DDc', // 10^39 (дуодециллион)
  'TDc', // 10^42 (тредециллион)
  'QaDc', // 10^45 (квадрадециллион)
  'QiDc', // 10^48 (квинтдециллион)
  'SxDc', // 10^51 (секстдециллион)
  'SpDc', // 10^54 (септдециллион)
  'OcDc', // 10^57 (октодециллион)
  'NoDc', // 10^60 (нонодециллион)
  'Vg', // 10^63 (вигинтиллион)
  'UVg', // 10^66 (унвигинтиллион)
  'DVg', // 10^69 (дуовигинтиллион)
  'TVg', // 10^72 (тревигинтиллион)
  'QaVg', // 10^75 (квадравигинтиллион)
  'QiVg', // 10^78 (квинтвигинтиллион)
  'SxVg', // 10^81 (секствигинтиллион)
  'SpVg', // 10^84 (септвигинтиллион)
  'OcVg', // 10^87 (октовигинтиллион)
  'NoVg', // 10^90 (ноновигинтиллион)
  'Tg', // 10^93 (тригинтиллион)
  'UTg', // 10^96 (унтригинтиллион)
  'DTg', // 10^99 (дуотригинтиллион)
];

// Базовые суффиксы (до 10^30)
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
];

// Префиксы подуровней
const subLevelPrefixes = [
  '', // 0: дециллион (Dc), вигинтиллион (Vg)
  'U', // 1: ундециллион (UDc), унвигинтиллион (UVg)
  'D', // 2: дуодециллион (DDc), дуовигинтиллион (DVg)
  'T', // 3: тредециллион (TDc), тревигинтиллион (TVg)
  'Qa', // 4: квадрадециллион (QaDc), квадравигинтиллион (QaVg)
  'Qi', // 5: квинтдециллион (QiDc), квинтвигинтиллион (QiVg)
  'Sx', // 6: секстдециллион (SxDc), секствигинтиллион (SxVg)
  'Sp', // 7: септдециллион (SpDc), септвигинтиллион (SpVg)
  'Oc', // 8: октодециллион (OcDc), октовигинтиллион (OcVg)
  'No', // 9: нонодециллион (NoDc), ноновигинтиллион (NoVg)
  'C', // 10: центумдециллион (CDc), центумвигинтиллион (CVg)
];

// Основные уровни для больших чисел (после 10^33)
const majorLevels = [
  'Dc', // 10^33 (дециллион)
  'Vg', // 10^63 (вигинтиллион)
  'Tg', // 10^93 (тригинтиллион)
  'Qd', // 10^123 (квадрагинтиллион)
  'Qt', // 10^153 (квинтвигинтиллион)
  'Sv', // 10^183 (секствигинтиллион)
  'Ov', // 10^213 (октовигинтиллион)
  'Nv', // 10^243 (ноновигинтиллион)
  'Ctg', // 10^273 (центумтригинтиллион)
  'Cqd', // 10^303 (центумквадрагинтиллион)
  'Cqt', // 10^333 (центумквинтвигинтиллион)
  'Csv', // 10^363 (центумсекствигинтиллион)
  'Cov', // 10^393 (центумоктовигинтиллион)
  'Cnv', // 10^423 (центумноновигинтиллион)
  'Cdc', // 10^453 (центумдециллион)
  'Udc', // 10^483 (ундециллион второго порядка)
  'Ddc', // 10^513 (дуодециллион второго порядка)
  'Tdc', // 10^543 (тредециллион второго порядка)
  'Qadc', // 10^573 (квадрадециллион второго порядка)
  'Qidc', // 10^603 (квинтдециллион второго порядка)
  'Sxdc', // 10^633 (секстдециллион второго порядка)
  'Spdc', // 10^663 (септдециллион второго порядка)
  'Odc', // 10^693 (октодециллион второго порядка)
  'Ndc', // 10^723 (нонодециллион второго порядка)
  'Ctdc', // 10^753 (центумтредециллион)
  'Cqdc', // 10^783 (центумквадрадециллион)
  'Cgidc', // 10^813 (центумквинтдециллион)
  'Csxdc', // 10^843 (центумсекстдециллион)
  'Cspdc', // 10^873 (центумсептдециллион)
  'Codc', // 10^903 (центумоктодециллион)
  'Cndc', // 10^933 (центумнонодециллион)
  'Ccdc', // 10^963 (центумцентумдециллион)
  'Ggl', // 10^999 (гугол-дециллион)
];

// Функция для добавления пробелов в число (группировка по 3 цифры)
function addSpaces(numStr) {
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// // Функция для получения суффикса на основе экспоненты
// function getSuffixForExponent(exp) {
//   if (exp < 3) return '';

//   // Смещаем экспоненту на 15, чтобы K соответствовал 10^15
//   const shiftedExp = exp - 15;
//   const basePower = Math.floor(shiftedExp / 3) * 3 + 3;
//   const levelIndex = Math.floor(basePower / 99);
//   const baseSuffixIndex = Math.floor((basePower % 99) / 3);

//   return suffixes[baseSuffixIndex] + suffixes[levelIndex];
// }

// Функция для получения суффикса на основе экспоненты
function getSuffixForExponent(exp) {
  // Если экспонента меньше 3, возвращаем пустой суффикс
  if (exp < 3) return '';

  // Смещаем экспоненту на 15, чтобы K соответствовал 10^15 (как в старой функции)
  const shiftedExp = exp - 15;

  // Определяем уровень и подуровень
  const levelIndex = Math.floor(Math.floor(shiftedExp / 3) / baseSuffixes.length);
  const subLevelIndex = levelIndex % subLevelPrefixes.length;
  const majorLevelIndex = Math.floor(levelIndex / subLevelPrefixes.length);

  // Если экспонента соответствует базовым суффиксам (до 10^30)
  if (shiftedExp < baseSuffixes.length * 3) {
    return baseSuffixes[Math.floor(shiftedExp / 3)];
  }

  // Формируем суффикс для больших чисел
  const subPrefix = subLevelPrefixes[subLevelIndex];
  const majorLevel = majorLevelIndex < majorLevels.length ? majorLevels[majorLevelIndex] : 'C'.repeat(majorLevelIndex);
  return `${subPrefix}${majorLevel}`;
}

// Основная функция форматирования
export function formatNumber(value, level = 0) {
  if (!(value instanceof Decimal)) {
    value = new Decimal(value);
  }

  if (value.lte(0)) return '0';

  // Маленькие числа с decimal places
  if (value.lt(100)) {
    let places = 0;
    if (value.lt(1)) places = 3;
    else if (value.lt(10)) places = 2;
    else places = 1;
    return value.toFixed(places).replace('.', ',');
  }

  const exp = value.log10().floor();
  const expNum = exp.toNumber();

  // До 10^15: полные числа с пробелами
  if (expNum < 15) {
    return addSpaces(value.toFixed(0));
  }

  // Для экспонент от 15 до 999: полные числа с суффиксами
  if (expNum < 1000) {
    // Смещаем экспоненту для правильного определения суффикса
    const suffix = getSuffixForExponent(expNum);

    // Определяем basePower как ближайшую нижнюю степень 3
    const basePower = Math.floor((expNum - 15) / 3) * 3 + 3;

    // Вычисляем мантиссу
    const mantissa = value.div(Decimal.pow(10, basePower));
    let numberStr = mantissa.toFixed(0).replace(/\.?0+$/, '');

    numberStr = addSpaces(numberStr);

    return numberStr + (suffix ? ' ' + suffix : '');
  }

  // Экспоненциальный формат для exp >= 1000
  const mantissa = value.div(Decimal.pow(10, exp));
  let mantStr = mantissa.toFixed(0).replace(/\.?0+$/, '');

  mantStr = addSpaces(mantStr);

  // Форматируем экспоненту
  let expStr = exp.toString();
  if (exp.gte(1e15) && level < 5) {
    expStr = formatNumber(exp, level + 1);
  } else {
    expStr = addSpaces(expStr);
  }

  return mantStr + ' e ' + expStr;
}

// Тестирование
console.log('1e6 (10^6):', formatNumber(new Decimal(1e6))); // "1 M"
console.log('1e9 (10^9):', formatNumber(new Decimal(1e9))); // "1 B"
console.log('1e12 (10^12):', formatNumber(new Decimal('1e12'))); // "1 T"
console.log('1e15 (10^15):', formatNumber(new Decimal('1e15'))); // "1 Qa"
console.log('1e16 (10^16):', formatNumber(new Decimal('1e16'))); // "10 Qa"
console.log('1e17 (10^17):', formatNumber(new Decimal('1e17'))); // "100 Qa"
console.log('1e18 (10^18):', formatNumber(new Decimal('1e18'))); // "1 Qi"
console.log('1e21 (10^21):', formatNumber(new Decimal('1e21'))); // "1 Sx"
console.log(
  '1e21 (10^2100):',
  formatNumber(new Decimal('2222222222222222222222')),
); // "1 Sx"
console.log('1234567890123456 (1.234e15):', formatNumber(new Decimal(1234567890123456))); // "1,234 Qa"
console.log('1234567890123456789 (1.234e18):', formatNumber(new Decimal('1234567890123456789'))); // "1,234 Qi"

export { Decimal };
