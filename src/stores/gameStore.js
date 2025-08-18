import { defineStore } from 'pinia';
import { Decimal } from '../utils/formatNumber.js';

import { 
  getTreesState,
} from './modules/treeModule.js';

import { energyActions } from './modules/energyModule.js';

export const useGameStore = defineStore('game', {
  state: () => ({
    energy: new Decimal(1),
    matter: new Decimal(100),
    antimatter: new Decimal(115),

    prestigeBonus: new Decimal(1),
    currentCategoryEnergySpeed: new Decimal(0.01),
    treeState: getTreesState(),
  }),

  actions: {
    ...energyActions,

    tick(deltaTime) {
      this.generateEnergy(deltaTime);
    },
  },
});
