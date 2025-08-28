import { Decimal } from '../../utils/formatNumber.js';
import {getCategoryRequirements, getElementRequirements, getGeneratorBaseCost} from '../../utils/gameFormulas.js';
import { MATTER_TREE, ANTI_MATTER_TREE } from '../../config/trees.js';

export function getTreesState() {
  const matterTree = MATTER_TREE.map((category, categoryIndex) => ({
    ...category,
    requirements: getCategoryRequirements(categoryIndex).div(categoryIndex),
    elements: category.elements.map((element, elementIndex) => ({
      ...element,
      count: new Decimal(0),
      requirements: getElementRequirements(categoryIndex, elementIndex).mul(categoryIndex),
      unlocked: elementIndex === 0,
      generator: {
        level: 1,
        cost: getGeneratorBaseCost(categoryIndex, elementIndex),
      },
    })),
  }));

  const antiMatterTree = ANTI_MATTER_TREE.map((category, categoryIndex) => ({
    ...category,
    requirements: getCategoryRequirements(categoryIndex).mul(categoryIndex),
    elements: category.elements.map((element, elementIndex) => ({
      ...element,
      count: new Decimal(0),
      requirements: getElementRequirements(categoryIndex, elementIndex).div(categoryIndex),
      unlocked: elementIndex === 0,
      generator: {
        level: 1,
        cost: getGeneratorBaseCost(categoryIndex, elementIndex),
      },
    })),
  }));

  return {
    matterTree,
    antiMatterTree,
  };
}
