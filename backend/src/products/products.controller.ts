import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BatchUpdateProductDto } from './dto/batch-update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post()
  async create(@Req() req: any, @Body() createProductDto: CreateProductDto) {
    // Get organizationId from user, or use a default one
    let organizationId = req.user.organizationId;
    
    // If user doesn't have an organization, create or get default one
    if (!organizationId) {
      const defaultOrg = await this.productsService.getOrCreateDefaultOrganization();
      organizationId = defaultOrg.id;
    }
    
    const productData = {
      ...createProductDto,
      organizationId
    };
    return this.productsService.create(productData);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch('batch')
  batchUpdate(@Body() batchUpdateProductDto: BatchUpdateProductDto) {
    return this.productsService.batchUpdate(batchUpdateProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
