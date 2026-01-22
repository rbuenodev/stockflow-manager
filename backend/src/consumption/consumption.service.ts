import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConsumptionStatus, Prisma } from '@prisma/client';

@Injectable()
export class ConsumptionService {
  constructor(private prisma: PrismaService) {}

  async add(userId: string, createConsumptionDto: CreateConsumptionDto) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: createConsumptionDto.productId }
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      if (product.stockQuantity < createConsumptionDto.quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      // Deduct stock immediately
      await tx.product.update({
        where: { id: createConsumptionDto.productId },
        data: { stockQuantity: { decrement: createConsumptionDto.quantity } }
      });

      // Create consumption record
      return tx.consumptionItem.create({
        data: {
          userId,
          productId: createConsumptionDto.productId,
          quantity: createConsumptionDto.quantity,
          status: ConsumptionStatus.PENDING,
        },
        include: { product: true }
      });
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
    });

    if (pendingItems.length === 0) {
        throw new BadRequestException('No pending items to process');
    }

    // 2. Only update status (Stock was already deducted during 'add')
    return this.prisma.consumptionItem.updateMany({
        where: { userId, status: ConsumptionStatus.PENDING },
        data: { status: ConsumptionStatus.PROCESSED }
    });
  }
}
