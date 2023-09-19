import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Transform, Type } from 'class-transformer';
import { ethers } from 'ethers';
import { ValidateNested } from 'class-validator';
import { Item, Collection } from '.';

export enum OrderType {
  ASK = 'ASK',
  BID = 'BID',
  ENGLISH_AUCTION = 'ENGLISH_AUCTION',
  DUTCH_AUCTION = 'DUTCH_AUCTION',
}

registerEnumType(OrderType, {
  name: 'OrderType',
});

@ObjectType()
@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 64 })
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  hash!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @ManyToOne(() => Collection)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Item, { nullable: true })
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string | null;

  @Field(() => OrderType)
  @Column('enum', { enum: OrderType, enumName: 'order_type' })
  type!: OrderType;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  price!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  startingPrice!: string | null;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => Date)
  @Column('timestamp without time zone')
  startTime!: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  endTime!: Date | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  counter!: string;

  // Nullable only on GraphQL because it's hidden from the frontend for English auctions
  @Field(() => String, { nullable: true })
  @Column('text')
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  signature!: string;

  @Field(() => String, { nullable: true })
  @Column('char', { length: 64, nullable: true })
  @Transform(
    ({ value }) =>
      value !== null
        ? ethers.utils.hexlify(value, { allowMissingPrefix: true })
        : null,
    {
      toPlainOnly: true,
    },
  )
  cancelTxHash!: string | null;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  cancelLogIdx!: string | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  cancelTimestamp!: Date | null;

  // GraphQL only fields

  @Field(() => Collection, { nullable: true })
  @Type(() => Collection)
  @ValidateNested()
  collection?: Collection | null;

  @Field(() => Item, { nullable: true })
  @Type(() => Item)
  @ValidateNested()
  item?: Item | null;
}
