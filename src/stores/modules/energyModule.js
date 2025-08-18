import { Decimal } from '../../utils/formatNumber.js';

export const energyActions = {
  generateEnergy(deltaTime) {
    const dt = new Decimal(deltaTime);
    const energyPerCurrentTick = this.currentCategoryEnergySpeed.mul(dt);

    this.energy = this.energy.add(energyPerCurrentTick);
  },
};