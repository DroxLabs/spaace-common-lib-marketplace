import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'staking_harvests' })
export class StakingHarvestEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  logIdx!: string;

  @Column('char', { length: 40 })
  pool!: string;

  @Column('char', { length: 40 })
  userAddress!: string;

  @Column('numeric', { precision: 78, unsigned: true })
  depositId!: string; // vestingTypeId for passive staking

  @Column('char', { length: 40 })
  token!: string;

  @Column('numeric', { precision: 78 })
  amount!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
