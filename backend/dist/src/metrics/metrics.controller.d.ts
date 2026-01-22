import { MetricsService } from './metrics.service';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
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
