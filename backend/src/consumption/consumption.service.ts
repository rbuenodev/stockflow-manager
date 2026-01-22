import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConsumptionStatus, Prisma } from '@prisma/client';

@Injectable()
export class ConsumptionService {
  constructor(private prisma: PrismaService) {}

  async add(userId: string, createConsumptionDto: CreateConsumptionDto) {
    const product = await this.prisma.product.findUnique({
        where: { id: createConsumptionDto.productId }
    });

    if (!product) {
        throw new BadRequestException('Product not found');
    }

    if (product.stockQuantity < createConsumptionDto.quantity) {
        throw new BadRequestException('Insufficient stock');
    }

    return this.prisma.consumptionItem.create({
      data: {
        userId,
        productId: createConsumptionDto.productId,
        quantity: createConsumptionDto.quantity,
        status: ConsumptionStatus.PENDING,
      },
      include: { product: true }
    });
  }

  findPendingByUser(userId: string) {
    return this.prisma.consumptionItem.findMany({
      where: { userId, status: ConsumptionStatus.PENDING },
      include: { product: true },
    });
  }

  findAllPending() {
    return this.prisma.consumptionItem.findMany({
      where: { status: ConsumptionStatus.PENDING },
      include: { product: true, user: true },
    });
  }

  async processConsumption(userId: string) {
    // 1. Get all pending items for user
    const pendingItems = await this.prisma.consumptionItem.findMany({
      where: { userId, status: ConsumptionStatus.PENDING },
      include: { product: true }
    });

    if (pendingItems.length === 0) {
        throw new BadRequestException('No pending items to process');
    }

    // 2. Execute transaction: Deduct stock and update status
    return this.prisma.$transaction(async (tx) => {
        for (const item of pendingItems) {
            // Check stock again to be safe
            const product = await tx.product.findUnique({ where: { id: item.productId } });
            if (!product || product.stockQuantity < item.quantity) {
                throw new BadRequestException(`Insufficient stock for product ${product?.name ?? 'Unknown'}`);
            }

            // Deduct stock
            await tx.product.update({
                where: { id: item.productId },
                data: { stockQuantity: { decrement: item.quantity } }
            });

            // Update item status
            await tx.consumptionItem.update({
                where: { id: item.id },
                data: { status: ConsumptionStatus.PROCESSED }
            });
        }
    });
  }
}
