import { Decimal } from '../../utils/formatNumber.js';
import { MATTER_TREE, ANTIMATTER_TREE } from '../../config/trees.js';

export function getTreesState() {
  const matterTree = MATTER_TREE.map((category, categoryIndex) => ({
    ...category,
    // requirements: getCategoryRequirements(categoryIndex),
    fixedEnergySpeed: new Decimal(0),
    elements: category.elements.map((element, elementIndex) => ({
      ...element,
      count: new Decimal(0),
    //   requirements: getElementRequirements(categoryIndex, elementIndex),
      unlocked: elementIndex === 0,
      generator: {
        level: 1,
        // cost: getGeneratorBaseCost(categoryIndex, elementIndex),
        // energyRate: getGeneratorBaseEnergyRate(categoryIndex, elementIndex),
      },
    })),
  }));

  const antimatterTree = ANTIMATTER_TREE.map((category, categoryIndex) => ({
    ...category,
    // requirements: getCategoryRequirements(categoryIndex),
    fixedEnergySpeed: new Decimal(0),
    elements: category.elements.map((element, elementIndex) => ({
      ...element,
      count: new Decimal(0),
    //   requirements: getElementRequirements(categoryIndex, elementIndex),
      unlocked: elementIndex === 0,
      generator: {
        level: 1,
        // cost: getGeneratorBaseCost(categoryIndex, elementIndex),
        // energyRate: getGeneratorBaseEnergyRate(categoryIndex, elementIndex),
      },
    })),
  }));

  return {
    matterTree,
    antimatterTree,
    currentCategoryIndex: 0,
    energy: new Decimal(1),
    prestigeBonus: new Decimal(1),
    currentCategoryEnergySpeed: new Decimal(0.01),
    savedEnergySpeed: new Decimal(0),
  };
}
