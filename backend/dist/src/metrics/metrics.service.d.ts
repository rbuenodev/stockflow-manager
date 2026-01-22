import { PrismaService } from '../prisma/prisma.service';
export declare class MetricsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardMetrics(): Promise<{
        totalProducts: number;
        lowStockCount: number;
        pendingConsumptions: number;
        topConsumed: {
            name: string;
            quantity: number | null;
        }[];
    }>;
}
