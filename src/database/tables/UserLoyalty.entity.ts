import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ethers } from 'ethers';
import { Season, User } from '.';

@ObjectType()
@Entity({ name: 'user_loyalties' })
export class UserLoyalty extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
  points!: string;
}