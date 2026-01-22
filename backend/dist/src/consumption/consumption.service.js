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
exports.ConsumptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ConsumptionService = class ConsumptionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add(userId, createConsumptionDto) {
        return this.prisma.$transaction(async (tx) => {
            const product = await tx.product.findUnique({
                where: { id: createConsumptionDto.productId }
            });
            if (!product) {
                throw new common_1.BadRequestException('Product not found');
            }
            if (product.stockQuantity < createConsumptionDto.quantity) {
                throw new common_1.BadRequestException('Insufficient stock');
            }
            await tx.product.update({
                where: { id: createConsumptionDto.productId },
                data: { stockQuantity: { decrement: createConsumptionDto.quantity } }
            });
            return tx.consumptionItem.create({
                data: {
                    userId,
                    productId: createConsumptionDto.productId,
                    quantity: createConsumptionDto.quantity,
                    status: client_1.ConsumptionStatus.PENDING,
                },
                include: { product: true }
            });
        });
    }
    findPendingByUser(userId) {
        return this.prisma.consumptionItem.findMany({
            where: { userId, status: client_1.ConsumptionStatus.PENDING },
            include: { product: true },
        });
    }
    findAllPending() {
        return this.prisma.consumptionItem.findMany({
            where: { status: client_1.ConsumptionStatus.PENDING },
            include: { product: true, user: true },
        });
    }
    async processConsumption(userId) {
        const pendingItems = await this.prisma.consumptionItem.findMany({
            where: { userId, status: client_1.ConsumptionStatus.PENDING },
        });
        if (pendingItems.length === 0) {
            throw new common_1.BadRequestException('No pending items to process');
        }
        return this.prisma.consumptionItem.updateMany({
            where: { userId, status: client_1.ConsumptionStatus.PENDING },
            data: { status: client_1.ConsumptionStatus.PROCESSED }
        });
    }
};
exports.ConsumptionService = ConsumptionService;
exports.ConsumptionService = ConsumptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConsumptionService);
//# sourceMappingURL=consumption.service.js.map