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
exports.CollectionAttributeValue = void 0;
const graphql_1 = require("@nestjs/graphql");
const __1 = require("..");
let CollectionAttributeValue = class CollectionAttributeValue {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttributeValue.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttributeValue.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttributeValue.prototype, "value", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttributeValue.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Order, { nullable: true }),
    __metadata("design:type", Object)
], CollectionAttributeValue.prototype, "buyNow", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Order, { nullable: true }),
    __metadata("design:type", Object)
], CollectionAttributeValue.prototype, "sellNow", void 0);
CollectionAttributeValue = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionAttributeValue);
exports.CollectionAttributeValue = CollectionAttributeValue;
//# sourceMappingURL=CollectionAttributeValue.js.map