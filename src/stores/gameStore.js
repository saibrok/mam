import { defineStore } from 'pinia';
import { Decimal } from '../utils/formatNumber.js';

import { getTreesState } from './modules/treeModule.js';

import { resourcesActions } from './modules/resourcesModule.js';

export const useGameStore = defineStore('game', {
  state: () => ({
    energy: new Decimal(0),
    matter: new Decimal(0),
    antiMatter: new Decimal(0),

    matterSpeed: new Decimal(0.1),
    antiMatterSpeed: new Decimal(0.2),

    timerDuration: new Decimal(5),

    treeState: getTreesState(),

    currentCategory: { matter: 0, antiMatter: 0 },

    prestigeBonus: new Decimal(1),

    balanceMass: new Decimal(110.5),

    isGameOver: false,
  }),

  actions: {
    ...resourcesActions,

    tick(deltaTime) {
      this.generateResources(deltaTime);
    },
  },
});
