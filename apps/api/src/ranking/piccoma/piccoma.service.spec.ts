import { Test, TestingModule } from '@nestjs/testing';
import { PiccomaService } from './piccoma.service';

describe('PiccomaService', () => {
  let service: PiccomaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiccomaService],
    }).compile();

    service = module.get<PiccomaService>(PiccomaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
