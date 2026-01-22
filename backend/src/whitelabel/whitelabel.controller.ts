import { Body, Controller, Get, Patch } from '@nestjs/common';
import { WhitelabelService } from './whitelabel.service';
import { UpdateWhitelabelDto } from './dto/update-whitelabel.dto';

@Controller('whitelabel')
export class WhitelabelController {
  constructor(private readonly whitelabelService: WhitelabelService) {}

  @Get('config')
  findDefault() {
    return this.whitelabelService.findDefault();
  }

  @Patch()
  update(@Body() updateWhitelabelDto: UpdateWhitelabelDto) {
    return this.whitelabelService.update(updateWhitelabelDto);
  }
}
