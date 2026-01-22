import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhitelabelService {
  constructor(private prisma: PrismaService) {}

  async findDefault() {
    // For now, return the first organization found. 
    // In a multi-tenant setup, this would depend on the hostname or user context.
    return this.prisma.organization.findFirst();
  }
  
  async findOne(id: string) {
      return this.prisma.organization.findUnique({ where: { id } });
  }

  async update(updateWhitelabelDto: any) {
    let org = await this.findDefault();
    
    // If no organization exists, create a default one
    if (!org) {
        org = await this.prisma.organization.create({
            data: {
                name: updateWhitelabelDto.name || 'StockFlow Manager',
                primaryColor: updateWhitelabelDto.primaryColor || '#2563eb',
                secondaryColor: updateWhitelabelDto.secondaryColor || '#64748b',
                logoUrl: updateWhitelabelDto.logoUrl || null,
            }
        });
        return org;
    }
    
    // Update existing organization
    return this.prisma.organization.update({
        where: { id: org.id },
        data: updateWhitelabelDto
    });
  }
}
