import { Decimal } from '../../utils/formatNumber.js';
import { gameFormulas } from '../../utils/gameFormulas.js';
import { MATTER_TREE, ANTIMATTER_TREE } from '../../config/trees.js';

const {getCategoryRequirements, getElementRequirements} = gameFormulas;


export function getTreesState() {
  const matterTree = MATTER_TREE.map((category, categoryIndex) => ({
    ...category,
    requirements: getCategoryRequirements(categoryIndex) / 2,
    elements: category.elements.map((element, elementIndex) => ({
      ...element,
      count: new Decimal(0),
      requirements: getElementRequirements(categoryIndex, elementIndex) * 2,
      unlocked: elementIndex === 0,
      generator: {
        level: 1,
        // cost: getGeneratorBaseCost(categoryIndex, elementIndex),
      },
    })),
  }));

  const antimatterTree = ANTIMATTER_TREE.map((category, categoryIndex) => ({
    ...category,
    requirements: getCategoryRequirements(categoryIndex),
    elements: category.elements.map((element, elementIndex) => ({
      ...element,
      count: new Decimal(0),
      requirements: getElementRequirements(categoryIndex, elementIndex),
      unlocked: elementIndex === 0,
      generator: {
        level: 1,
        // cost: getGeneratorBaseCost(categoryIndex, elementIndex),
      },
    })),
  }));

  return {
    matterTree,
    antimatterTree,
  };
}
