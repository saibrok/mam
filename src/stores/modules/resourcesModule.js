import { Decimal } from '../../utils/formatNumber.js';

export const resourcesActions = {
  generateResources(deltaTime) {
    const dt = new Decimal(deltaTime);
    const matterPerCurrentTick = this.matterSpeed.mul(dt);
    const antimatterPerCurrentTick = this.antimatterSpeed.mul(dt);

    const energyPerCurrentTick = matterPerCurrentTick.add(antimatterPerCurrentTick);

    this.matter = this.matter.add(matterPerCurrentTick);
    this.antimatter = this.antimatter.add(antimatterPerCurrentTick);
    this.energy = this.energy.add(energyPerCurrentTick);
  },
};