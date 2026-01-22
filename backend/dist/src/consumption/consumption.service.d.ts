import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ConsumptionService {
    private prisma;
    constructor(prisma: PrismaService);
    add(userId: string, createConsumptionDto: CreateConsumptionDto): Promise<{
        product: {
            id: string;
            name: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
            stockQuantity: number;
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
    findPendingByUser(userId: string): Prisma.PrismaPromise<({
        product: {
            id: string;
            name: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
            stockQuantity: number;
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
    findAllPending(): Prisma.PrismaPromise<({
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
            price: Prisma.Decimal;
            stockQuantity: number;
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
    processConsumption(userId: string): Promise<void>;
}
