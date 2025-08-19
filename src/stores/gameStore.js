import { defineStore } from 'pinia';
import { Decimal } from '../utils/formatNumber.js';

import { getTreesState } from './modules/treeModule.js';

import { resourcesActions } from './modules/resourcesModule.js';

export const useGameStore = defineStore('game', {
  state: () => ({
    energy: new Decimal(0),
    matter: new Decimal(0),
    antimatter: new Decimal(0),

    matterSpeed: new Decimal(0.1),
    antimatterSpeed: new Decimal(0.2),

    treeState: getTreesState(),

    currentCategory: { matter: 1, antimatter: 1 },

    prestigeBonus: new Decimal(1),

    balanceMass: new Decimal(1),
  }),

  actions: {
    ...resourcesActions,

    tick(deltaTime) {
      this.generateResources(deltaTime);
    },
  },
});
