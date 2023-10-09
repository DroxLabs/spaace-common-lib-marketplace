import { MigrationInterface, QueryRunner } from 'typeorm';

export class CollectionAttributes1696876602845 implements MigrationInterface {
  name = 'CollectionAttributes1696876602845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a9502e3dd5540b99b8a927015"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD "traitHash" character(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD "valueHash" character(40)`,
    );
    await queryRunner.query(
      `UPDATE "item_attributes" SET "traitHash" = ENCODE(DIGEST("trait", 'sha1'), 'hex'), "valueHash" = ENCODE(DIGEST("value", 'sha1'), 'hex')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ALTER COLUMN "traitHash" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ALTER COLUMN "valueHash" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b1478d78161a2434a3beab664b" ON "item_attributes" ("collectionAddress", "tokenId", "traitHash") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1866bd8ac2446df677ded46be6" ON "item_attributes" ("collectionAddress", "traitHash", "valueHash") `,
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1866bd8ac2446df677ded46be6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1478d78161a2434a3beab664b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP COLUMN "valueHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP COLUMN "traitHash"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a9502e3dd5540b99b8a927015" ON "item_attributes" ("collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT array_to_json(ARRAY (SELECT json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'values', array_to_json(ARRAY (SELECT json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'value', "value"."value", 'count', COUNT(DISTINCT "value"."tokenId")) FROM "item_attributes" "value" WHERE "value"."collectionAddress" = "collection"."address" AND "value"."trait" = "attribute"."trait" GROUP BY "value"."value"))) FROM "item_attributes" "attribute" WHERE "attribute"."collectionAddress" = "collection"."address" GROUP BY "attribute"."trait")) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "attributes", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT array_to_json(ARRAY (SELECT json_build_object(\'collectionAddress\', "collection"."address", \'trait\', "attribute"."trait", \'values\', array_to_json(ARRAY (SELECT json_build_object(\'collectionAddress\', "collection"."address", \'trait\', "attribute"."trait", \'value\', "value"."value", \'count\', COUNT(DISTINCT "value"."tokenId")) FROM "item_attributes" "value" WHERE "value"."collectionAddress" = "collection"."address" AND "value"."trait" = "attribute"."trait" GROUP BY "value"."value"))) FROM "item_attributes" "attribute" WHERE "attribute"."collectionAddress" = "collection"."address" GROUP BY "attribute"."trait")) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "attributes", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
  }
}
