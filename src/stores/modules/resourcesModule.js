import { Decimal } from '../../utils/formatNumber.js';

export const resourcesActions = {
  generateResources(deltaTime) {
    const dt = new Decimal(deltaTime);
    const matterPerCurrentTick = this.matterSpeed.mul(dt);
    const antiMatterPerCurrentTick = this.antiMatterSpeed.mul(dt);
    this.antiMatterSpeed = this.antiMatterSpeed.mul(1.1);

    const energyPerCurrentTick = matterPerCurrentTick.add(antiMatterPerCurrentTick);

    this.matter = this.matter.add(matterPerCurrentTick);
    this.antiMatter = this.antiMatter.add(antiMatterPerCurrentTick);
    this.energy = this.energy.add(energyPerCurrentTick);
  },
};