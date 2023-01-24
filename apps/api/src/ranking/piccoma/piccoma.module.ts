import { Module } from '@nestjs/common';
import { PiccomaService } from './piccoma.service';
import { PiccomaController } from './piccoma.controller';

@Module({
  controllers: [PiccomaController],
  providers: [PiccomaService],
})
export class PiccomaModule {}
