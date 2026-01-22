import { Module } from '@nestjs/common';
import { WhitelabelService } from './whitelabel.service';
import { WhitelabelController } from './whitelabel.controller';

@Module({
  controllers: [WhitelabelController],
  providers: [WhitelabelService]
})
export class WhitelabelModule {}
