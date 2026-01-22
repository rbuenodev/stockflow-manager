import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
export declare class ConsumptionController {
    private readonly consumptionService;
    constructor(consumptionService: ConsumptionService);
    add(req: any, createConsumptionDto: CreateConsumptionDto): Promise<{
        product: {
            id: string;
            name: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        status: import(".prisma/client").$Enums.ConsumptionStatus;
        userId: string;
        productId: string;
    }>;
    findMyConsumption(req: any): import(".prisma/client").Prisma.PrismaPromise<({
        product: {
            id: string;
            name: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        status: import(".prisma/client").$Enums.ConsumptionStatus;
        userId: string;
        productId: string;
    })[]>;
    findAllPending(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            organizationId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        product: {
            id: string;
            name: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            stockQuantity: number;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        status: import(".prisma/client").$Enums.ConsumptionStatus;
        userId: string;
        productId: string;
    })[]>;
    checkout(userId: string): Promise<void>;
}
