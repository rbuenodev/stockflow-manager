import { Controller, Get, Post, Body, Req, UseGuards, Param } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post('add')
  add(@Req() req: any, @Body() createConsumptionDto: CreateConsumptionDto) {
    return this.consumptionService.add(req.user.userId, createConsumptionDto);
  }

  @Get('my')
  findMyConsumption(@Req() req: any) {
    return this.consumptionService.findPendingByUser(req.user.userId);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Get('all')
  findAllPending() {
    return this.consumptionService.findAllPending();
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @Post('checkout/:userId')
  checkout(@Param('userId') userId: string) {
    return this.consumptionService.processConsumption(userId);
  }
}
