import { Test, TestingModule } from '@nestjs/testing';
import { PiccomaController } from './piccoma.controller';
import { PiccomaService } from './piccoma.service';

describe('PiccomaController', () => {
  let controller: PiccomaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiccomaController],
      providers: [PiccomaService],
    }).compile();

    controller = module.get<PiccomaController>(PiccomaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
