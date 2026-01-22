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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createProductDto) {
        if (!createProductDto.organizationId) {
            throw new common_1.BadRequestException('Organization ID is required');
        }
        return this.prisma.product.create({
            data: {
                name: createProductDto.name,
                price: createProductDto.price,
                stockQuantity: createProductDto.stockQuantity,
                organizationId: createProductDto.organizationId,
            },
        });
    }
    async getOrCreateDefaultOrganization() {
        let org = await this.prisma.organization.findFirst();
        if (!org) {
            org = await this.prisma.organization.create({
                data: {
                    name: 'Default Organization',
                    primaryColor: '#2563eb',
                },
            });
        }
        return org;
    }
    findAll() {
        return this.prisma.product.findMany();
    }
    findOne(id) {
        return this.prisma.product.findUnique({ where: { id } });
    }
    update(id, updateProductDto) {
        return this.prisma.product.update({
            where: { id },
            data: updateProductDto,
        });
    }
    remove(id) {
        return this.prisma.product.delete({ where: { id } });
    }
    async batchUpdate(dto) {
        if (dto.type === 'PERCENTAGE') {
            const factor = 1 + (dto.value / 100);
            await this.prisma.$executeRaw `UPDATE "Product" SET price = price * ${factor}`;
        }
        else if (dto.type === 'FIXED') {
            await this.prisma.$executeRaw `UPDATE "Product" SET price = price + ${dto.value}`;
        }
        if (dto.stockAdjustment) {
            await this.prisma.$executeRaw `UPDATE "Product" SET "stockQuantity" = "stockQuantity" + ${dto.stockAdjustment}`;
        }
        return { message: 'Batch update processing started' };
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map