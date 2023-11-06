import { MigrationInterface, QueryRunner } from 'typeorm';

export class BalanceItemTitleDescription1699270795134
  implements MigrationInterface
{
  name = 'BalanceItemTitleDescription1699270795134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC, "sellNow"."price" DESC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'b4fbf271143f4fbf7b91a5ded31805e42b2208d6\') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'b4fbf271143f4fbf7b91a5ded31805e42b2208d6\') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'b4fbf271143f4fbf7b91a5ded31805e42b2208d6\') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC, "sellNow"."price" DESC',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC, "sellNow"."price" DESC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'b4fbf271143f4fbf7b91a5ded31805e42b2208d6\') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'b4fbf271143f4fbf7b91a5ded31805e42b2208d6\') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'b4fbf271143f4fbf7b91a5ded31805e42b2208d6\') ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC, "sellNow"."price" DESC',
      ],
    );
  }
}