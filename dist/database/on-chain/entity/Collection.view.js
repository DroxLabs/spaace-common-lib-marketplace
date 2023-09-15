"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const graphql_1 = require("../../../graphql");
const __1 = require("../../..");
const ethers_1 = require("ethers");
const graphql_2 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function getSaleCountQuery(interval) {
    return (query) => query
        .from(_1.Sale, 'sale')
        .select('COUNT(*)')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
        .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
}
function getVolumeQuery(interval) {
    return (query) => query
        .from(_1.Sale, 'sale')
        .select('SUM("sale"."price")')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
        .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
}
function getVolumeChangeQuery(interval) {
    return (query) => query
        .from(_1.Sale, 'sale')
        .select(`${getVolumeQuery(interval)(query.subQuery()).getQuery()} - SUM("sale"."price")`)
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
        .andWhere(`"sale"."timestamp" > NOW() - (INTERVAL '${interval}' * 2)`)
        .andWhere(`"sale"."timestamp" <= NOW() - INTERVAL '${interval}'`);
}
let Collection = class Collection extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Collection.prototype, "address", void 0);
__decorate([
    (0, graphql_2.Field)(() => _1.CollectionType),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "type", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "symbol", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_2.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "active", void 0);
__decorate([
    (0, graphql_2.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "verified", void 0);
__decorate([
    (0, graphql_2.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "explicit", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "bannerUrl", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "description", void 0);
__decorate([
    (0, graphql_2.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "deployedAt", void 0);
__decorate([
    (0, graphql_2.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], Collection.prototype, "deployer", void 0);
__decorate([
    (0, graphql_2.Field)(() => [_1.CollectionLink]),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Type)(() => _1.CollectionLink),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], Collection.prototype, "links", void 0);
__decorate([
    (0, graphql_2.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "lastImport", void 0);
__decorate([
    (0, graphql_2.Field)(() => [graphql_1.CollectionAttribute], { nullable: true })
    // @ViewColumn()
    ,
    __metadata("design:type", Object)
], Collection.prototype, "attributes", void 0);
__decorate([
    (0, graphql_2.Field)(() => _1.Order, { nullable: true })
    // @ViewColumn()
    ,
    (0, class_transformer_1.Type)(() => _1.Order),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], Collection.prototype, "buyNow", void 0);
__decorate([
    (0, graphql_2.Field)(() => _1.Order, { nullable: true })
    // @ViewColumn()
    ,
    (0, class_transformer_1.Type)(() => _1.Order),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], Collection.prototype, "sellNow", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume1h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange1h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume6h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange6h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange24h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange7d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange30d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume", void 0);
__decorate([
    (0, graphql_2.Field)(() => String)
    // @ViewColumn()
    ,
    __metadata("design:type", String)
], Collection.prototype, "floorChange1h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String)
    // @ViewColumn()
    ,
    __metadata("design:type", String)
], Collection.prototype, "floorChange6h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String)
    // @ViewColumn()
    ,
    __metadata("design:type", String)
], Collection.prototype, "floorChange24h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String)
    // @ViewColumn()
    ,
    __metadata("design:type", String)
], Collection.prototype, "floorChange7d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String)
    // @ViewColumn()
    ,
    __metadata("design:type", String)
], Collection.prototype, "floorChange30d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount1h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount6h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount24h", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount7d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount30d", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "totalSupply", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "ownerCount", void 0);
__decorate([
    (0, graphql_2.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "listedCount", void 0);
Collection = __decorate([
    (0, graphql_2.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return (dataSource
                .createQueryBuilder()
                .from(_1.CollectionEntity, 'collection')
                .select('"collection".*')
                // TODO: attributes
                // TODO: buyNow
                // TODO: sellNow
                .addSelect(getVolumeQuery('1 hour'), 'volume1h')
                .addSelect(getVolumeChangeQuery('1 hour'), 'volumeChange1h')
                .addSelect(getVolumeQuery('6 hours'), 'volume6h')
                .addSelect(getVolumeChangeQuery('6 hours'), 'volumeChange6h')
                .addSelect(getVolumeQuery('1 day'), 'volume24h')
                .addSelect(getVolumeChangeQuery('1 day'), 'volumeChange24h')
                .addSelect(getVolumeQuery('7 days'), 'volume7d')
                .addSelect(getVolumeChangeQuery('7 days'), 'volumeChange7d')
                .addSelect(getVolumeQuery('30 days'), 'volume30d')
                .addSelect(getVolumeChangeQuery('30 days'), 'volumeChange30d')
                .addSelect((query) => query
                .from(_1.Sale, 'sale')
                .select('SUM("sale"."price")')
                .where('"sale"."collectionAddress" = "collection"."address"')
                .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`), 'volume')
                // TODO: floorChange1h
                // TODO: floorChange6h
                // TODO: floorChange24h
                // TODO: floorChange7d
                // TODO: floorChange30d
                .addSelect(getSaleCountQuery('1 hour'), 'saleCount1h')
                .addSelect(getSaleCountQuery('6 hours'), 'saleCount6h')
                .addSelect(getSaleCountQuery('1 day'), 'saleCount24h')
                .addSelect(getSaleCountQuery('7 days'), 'saleCount7d')
                .addSelect(getSaleCountQuery('30 days'), 'saleCount30d')
                .addSelect((query) => query
                .from(_1.Sale, 'sale')
                .select('COUNT(*)')
                .where('"sale"."collectionAddress" = "collection"."address"')
                .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`), 'saleCount')
                .addSelect((query) => query
                .from(_1.Balance, 'balance')
                .select('SUM("balance"."balance")')
                .where('"balance"."collectionAddress" = "collection"."address"'), 'totalSupply')
                .addSelect((query) => query
                .from(_1.Balance, 'balance')
                .select('COUNT(DISTINCT "balance"."userAddress")')
                .where('"balance"."collectionAddress" = "collection"."address"'), 'ownerCount')
                .addSelect((query) => query
                .from(_1.Order, 'order')
                .select('COUNT(DISTINCT "order"."tokenId")')
                .where(`"order"."type" IN ('${_1.OrderType.ASK}', '${_1.OrderType.DUTCH_AUCTION}', '${_1.OrderType.ENGLISH_AUCTION}')`)
                .andWhere('"order"."collectionAddress" = "collection"."address"')
                .andWhere('"order"."startTime" <= NOW()')
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .andWhere('"order"."cancelTimestamp" IS NULL')
                .andWhere((query) => `NOT EXISTS ${query
                .subQuery()
                .from(_1.Sale, 'sale')
                .where('"sale"."orderHash" = "order"."hash"')
                .getQuery()}`)
                .andWhere(`"order"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
                .andWhere((query) => `${query
                .subQuery()
                .select('"balance"."balance"')
                .from(_1.Balance, 'balance')
                .where('"balance"."userAddress" = "order"."userAddress"')
                .andWhere('"balance"."collectionAddress" = "order"."collectionAddress"')
                .andWhere('"balance"."tokenId" = "order"."tokenId"')
                .getQuery()} > 0`), 'listedCount'));
        },
        name: 'collections_view',
    })
], Collection);
exports.Collection = Collection;
//# sourceMappingURL=Collection.view.js.map