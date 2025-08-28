import { Decimal } from './formatNumber.js';

// Константы для формул
const GROWTH_COST_MULTIPLIER = new Decimal(1.15);
const GROWTH_ENERGY_MULTIPLIER = new Decimal(1.5);
const BASE_MULTIPLIER = new Decimal(100);
const BASE_COST = new Decimal(10);
const BASE_ENERGY = new Decimal(0.03);
const CATEGORY_COST_POWER = 2;
const ELEMENT_COST_MULTIPLIER = new Decimal(1.5);
const GENERATOR_COST_MULTIPLIER = new Decimal(2);

// Формулы для расчета требований и стоимостей

// Требования для разблокировки категории
function getCategoryRequirements(categoryIndex) {
  return BASE_COST.mul(BASE_MULTIPLIER).pow(new Decimal(categoryIndex).pow(categoryIndex) * CATEGORY_COST_POWER);
}

// Требования для разблокировки элемента
function getElementRequirements(categoryIndex, elementIndex) {
  return BASE_COST.mul(BASE_MULTIPLIER.pow(categoryIndex)).mul(ELEMENT_COST_MULTIPLIER.pow(elementIndex));
}

// Базовая скорость генерации энергии
function getGeneratorBaseEnergyRate(categoryIndex, elementIndex) {
  return BASE_ENERGY.mul(BASE_MULTIPLIER.pow(categoryIndex)).mul(GROWTH_ENERGY_MULTIPLIER.pow(elementIndex));
}

// Базовая стоимость генератора
function getGeneratorBaseCost(categoryIndex, elementIndex) {
  return BASE_COST.mul(BASE_MULTIPLIER.pow(categoryIndex).pow(categoryIndex)).mul(GENERATOR_COST_MULTIPLIER.pow(elementIndex));
}

// Стоимость улучшения генератора
function getUpgradeGeneratorCost(isMatter, categoryIndex, elementIndex, level) {
  const generatorBaseCost = getGeneratorBaseCost(categoryIndex, elementIndex);
  const levelMultiplier = GROWTH_COST_MULTIPLIER.pow(level); // Множитель, зависящий от уровня

  return generatorBaseCost
    .mul(GROWTH_COST_MULTIPLIER.pow(elementIndex - 1))
    .mul(levelMultiplier);
}

// Скорость генерации энергии элементом
function getElementEnergySpeed(element) {
  return element.count.mul(element.generator.level).mul(element.generator.energyRate);
}

// Скорость генерации элементов
function getElementGenerationRate(generatorLevel, deltaTime) {
  return new Decimal(generatorLevel).mul(deltaTime);
}

// Проверка, достаточно ли ресурсов для покупки
function canAfford(cost, resources) {
  return resources.gte(cost);
}

export {
  getCategoryRequirements,
  getElementRequirements,
  getGeneratorBaseCost,
  getGeneratorBaseEnergyRate,
  getUpgradeGeneratorCost,
  getElementEnergySpeed,
  getElementGenerationRate,
  canAfford,
};
