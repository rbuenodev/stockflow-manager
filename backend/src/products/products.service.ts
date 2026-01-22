import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    if (!createProductDto.organizationId) {
      throw new BadRequestException('Organization ID is required');
    }
    
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        stockQuantity: createProductDto.stockQuantity,
        organizationId: createProductDto.organizationId,
      },
    });
  }

  async getOrCreateDefaultOrganization() {
    // Try to find an existing organization
    let org = await this.prisma.organization.findFirst();
    
    // If no organization exists, create a default one
    if (!org) {
      org = await this.prisma.organization.create({
        data: {
          name: 'Default Organization',
          primaryColor: '#2563eb',
        },
      });
    }
    
    return org;
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  async batchUpdate(dto: { type: 'PERCENTAGE' | 'FIXED', value: number, stockAdjustment?: number }) {
    // This could be optimized with raw SQL for huge datasets, but for now we iterate or use separate updates.
    // Prisma doesn't support mathematical update on many rows easily without raw query or loop.
    // Let's use raw query for performance on price updates.
    
    if (dto.type === 'PERCENTAGE') {
        // e.g. value 10 means +10%, value -10 means -10%
        // formula: price = price * (1 + value/100)
        const factor = 1 + (dto.value / 100);
        await this.prisma.$executeRaw`UPDATE "Product" SET price = price * ${factor}`;
    } else if (dto.type === 'FIXED') {
        // e.g. value 10 means +10 to price
        await this.prisma.$executeRaw`UPDATE "Product" SET price = price + ${dto.value}`;
    }

    if (dto.stockAdjustment) {
        await this.prisma.$executeRaw`UPDATE "Product" SET "stockQuantity" = "stockQuantity" + ${dto.stockAdjustment}`;
    }

    return { message: 'Batch update processing started' };
  }
}
