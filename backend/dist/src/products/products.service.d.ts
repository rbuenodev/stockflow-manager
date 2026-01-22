import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getOrCreateDefaultOrganization(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        primaryColor: string;
        secondaryColor: string | null;
        logoUrl: string | null;
    }>;
    findAll(userRole?: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    batchUpdate(dto: {
        type: 'PERCENTAGE' | 'FIXED';
        value: number;
        stockAdjustment?: number;
    }): Promise<{
        message: string;
    }>;
}
