import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConsumptionStatus } from '@prisma/client';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics() {
    const totalProducts = await this.prisma.product.count();
    
    const lowStockCount = await this.prisma.product.count({
        where: { stockQuantity: { lt: 10 } } // threshold of 10
    });

    const pendingConsumptions = await this.prisma.consumptionItem.count({
        where: { status: ConsumptionStatus.PENDING }
    });

    // Mock top products for now as aggregation might be complex without order history explicitly stored widely
    // But we can aggregate processed consumption items
    const topConsumed = await this.prisma.consumptionItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
        where: { status: ConsumptionStatus.PROCESSED },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5
    });

    // Enrich top consumed with product names
    const enrichedTopConsumed = await Promise.all(topConsumed.map(async (item) => {
        const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
        return {
            name: product?.name || 'Unknown',
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
}
