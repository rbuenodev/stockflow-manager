import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ConsumptionService {
    private prisma;
    constructor(prisma: PrismaService);
    add(userId: string, createConsumptionDto: CreateConsumptionDto): Promise<{
        product: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
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
    findPendingByUser(userId: string): Prisma.PrismaPromise<({
        product: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
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
    findAllPending(): Prisma.PrismaPromise<({
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
            price: Prisma.Decimal;
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
    processConsumption(userId: string): Promise<Prisma.BatchPayload>;
}
