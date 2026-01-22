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
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let MetricsService = class MetricsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardMetrics() {
        const totalProducts = await this.prisma.product.count();
        const lowStockCount = await this.prisma.product.count({
            where: { stockQuantity: { lt: 10 } }
        });
        const pendingConsumptions = await this.prisma.consumptionItem.count({
            where: { status: client_1.ConsumptionStatus.PENDING }
        });
        const topConsumed = await this.prisma.consumptionItem.groupBy({
            by: ['productId'],
            _sum: { quantity: true },
            where: { status: client_1.ConsumptionStatus.PROCESSED },
            orderBy: { _sum: { quantity: 'desc' } },
            take: 5
        });
        const enrichedTopConsumed = await Promise.all(topConsumed.map(async (item) => {
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            return {
                name: (product === null || product === void 0 ? void 0 : product.name) || 'Unknown',
                quantity: item._sum.quantity
            };
        }));
        return {
            totalProducts,
            lowStockCount,
            pendingConsumptions,
            topConsumed: enrichedTopConsumed
        };
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map