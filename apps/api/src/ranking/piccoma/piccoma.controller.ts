import {
  Controller,
  Get, Param,
  Query,
} from '@nestjs/common';
import { PiccomaService } from './piccoma.service';
import { RequestPiccomaDto } from './dto/request-piccoma.dto';

@Controller('piccoma')
export class PiccomaController {
  constructor(private readonly piccomaService: PiccomaService) {}

  @Get('request')
  async request(@Query() req: RequestPiccomaDto) {
    return await this.piccomaService.scrapData(req);
  }
}
