"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullFloorPrice1699463906829 = void 0;
class NullFloorPrice1699463906829 {
    constructor() {
        this.name = 'NullFloorPrice1699463906829';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'collections_view', 'public']);
            yield queryRunner.query(`DROP VIEW "collections_view"`);
            yield queryRunner.query(`CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."decimals" AS "decimals", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", "ranking"."floorPrice" AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'collections_view',
                'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."decimals" AS "decimals", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", "ranking"."floorPrice" AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'collections_view', 'public']);
            yield queryRunner.query(`DROP VIEW "collections_view"`);
            yield queryRunner.query(`CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."decimals" AS "decimals", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'collections_view',
                'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."decimals" AS "decimals", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"',
            ]);
        });
    }
}
exports.NullFloorPrice1699463906829 = NullFloorPrice1699463906829;
//# sourceMappingURL=1699463906829-nullFloorPrice.js.map