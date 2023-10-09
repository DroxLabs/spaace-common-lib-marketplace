import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform, Type } from 'class-transformer';
import { ethers } from 'ethers';
import { ItemEntity, ItemMedia } from '../tables';
import { ValidateNested } from 'class-validator';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(ItemEntity, 'item')
      .select('"item"."collectionAddress"', 'collectionAddress')
      .addSelect('"item"."tokenId"', 'tokenId')
      .addSelect('"item"."title"', 'title')
      .addSelect('"item"."description"', 'description')
      .addSelect('"item"."tokenUri"', 'tokenUri')
      .addSelect('"item"."medias"', 'medias')
      .addSelect('"item"."rarityRanking"', 'rarityRanking')
      .addSelect('"item"."rarityScore"', 'rarityScore')
      .addSelect('"item"."lastImport"', 'lastImport');
  },
  name: 'items_view',
})
export class Item extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @ViewColumn()
  tokenId!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  title!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  description!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  tokenUri!: string | null;

  @Field(() => [ItemMedia], { nullable: true })
  @ViewColumn()
  @Type(() => ItemMedia)
  @ValidateNested({ each: true })
  medias!: ItemMedia[] | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  rarityRanking!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  rarityScore!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  lastImport!: Date | null;
}
