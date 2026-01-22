import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
export declare class ConsumptionController {
    private readonly consumptionService;
    constructor(consumptionService: ConsumptionService);
    add(req: any, createConsumptionDto: CreateConsumptionDto): Promise<{
        product: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            isActive: boolean;
            organizationId: string;
        };
    } & {
        id: string;
        quantity: number;
        status: import(".prisma/client").$Enums.ConsumptionStatus;
        userId: string;
        productId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMyConsumption(req: any): import(".prisma/client").Prisma.PrismaPromise<({
        product: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            isActive: boolean;
            organizationId: string;
        };
    } & {
        id: string;
        quantity: number;
        status: import(".prisma/client").$Enums.ConsumptionStatus;
        userId: string;
        productId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findAllPending(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string | null;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
        product: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            isActive: boolean;
            organizationId: string;
        };
    } & {
        id: string;
        quantity: number;
        status: import(".prisma/client").$Enums.ConsumptionStatus;
        userId: string;
        productId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    checkout(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
