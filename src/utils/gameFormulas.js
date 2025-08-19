import { Decimal } from './formatNumber.js';

// Константы для формул
export const FORMULA_CONSTANTS = {
  GROWTH_COST_MULTIPLIER: new Decimal(1.15),
  GROWTH_ENERGY_MULTIPLIER: new Decimal(1.5),
  BASE_MULTIPLIER: new Decimal(10),
  BASE_COST: new Decimal(10),
  BASE_ENERGY: new Decimal(0.03),
  CATEGORY_COST_POWER: 2,
  ELEMENT_COST_MULTIPLIER: new Decimal(1.5),
  GENERATOR_COST_MULTIPLIER: new Decimal(2),
};

// Формулы для расчета требований и стоимостей
export const gameFormulas = {
  // Требования для разблокировки категории
  getCategoryRequirements(categoryIndex) {
    const { BASE_COST, BASE_MULTIPLIER, CATEGORY_COST_POWER } = FORMULA_CONSTANTS;
    return BASE_COST.mul(BASE_MULTIPLIER).pow(categoryIndex * CATEGORY_COST_POWER);
  },

  // Требования для разблокировки элемента
  getElementRequirements(categoryIndex, elementIndex) {
    const { BASE_COST, BASE_MULTIPLIER, ELEMENT_COST_MULTIPLIER } = FORMULA_CONSTANTS;
    return BASE_COST
      .mul(BASE_MULTIPLIER.pow(categoryIndex))
      .mul(ELEMENT_COST_MULTIPLIER.pow(elementIndex));
  },

  // Базовая стоимость генератора
  getGeneratorBaseCost(categoryIndex, elementIndex) {
    const { BASE_COST, BASE_MULTIPLIER, GENERATOR_COST_MULTIPLIER } = FORMULA_CONSTANTS;
    return BASE_COST
      .mul(BASE_MULTIPLIER.pow(categoryIndex))
      .mul(GENERATOR_COST_MULTIPLIER.pow(elementIndex));
  },

  // Базовая скорость генерации энергии
  getGeneratorBaseEnergyRate(categoryIndex, elementIndex) {
    const { BASE_ENERGY, BASE_MULTIPLIER, GROWTH_ENERGY_MULTIPLIER } = FORMULA_CONSTANTS;
    return BASE_ENERGY
      .mul(BASE_MULTIPLIER.pow(categoryIndex))
      .mul(GROWTH_ENERGY_MULTIPLIER.pow(elementIndex));
  },

  // Стоимость улучшения генератора
  getUpgradeGeneratorCost(categoryIndex, elementIndex) {
    const { BASE_COST, GROWTH_COST_MULTIPLIER } = FORMULA_CONSTANTS;
    return BASE_COST.mul(GROWTH_COST_MULTIPLIER.pow(elementIndex - 1));
  },

  // Скорость генерации энергии элементом
  getElementEnergySpeed(element) {
    return element.count
      .mul(element.generator.level)
      .mul(element.generator.energyRate);
  },

  // Скорость генерации элементов
  getElementGenerationRate(generatorLevel, deltaTime) {
    return new Decimal(generatorLevel).mul(deltaTime);
  },

  // Проверка, достаточно ли ресурсов для покупки
  canAfford(cost, resources) {
    return resources.gte(cost);
  },
};