import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BatchUpdateProductDto } from './dto/batch-update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(req: any, createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        price: import("@prisma/client/runtime/library").Decimal;
        stockQuantity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }>;
    batchUpdate(batchUpdateProductDto: BatchUpdateProductDto): Promise<{
        message: string;
    }>;
    findAll(req: any): import(".prisma/client").Prisma.PrismaPromise<{
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
}
