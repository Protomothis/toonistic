import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PiccomaRankingMenus {
  manga = 'K',
  smartToon = 'S',
  novel = 'N',
}

export enum PiccomaSmartToonRankingCategories {
  common = '0',
  love = '1',
  fantasy = '2',
  drama = '3',
  daliy = '4',
  action = '5',
  sport = '6',
  mistery = '7',
  noir = '9',
  gourmet = '10',
}

export class RequestPiccomaDto {
  @IsEnum(PiccomaRankingMenus)
  @ApiProperty({
    description: '픽코마 데이터 요청시 필요한 제공하는 메뉴 입니다.',
    enum: Object.keys(PiccomaRankingMenus),
    default: Object.keys(PiccomaRankingMenus).shift(),
  })
  readonly menu: PiccomaRankingMenus;

  @IsEnum(PiccomaSmartToonRankingCategories)
  @ApiProperty({
    description: '픽코마 데이터 요청시 필요한 카테고리 값 입니다.',
    enum: Object.keys(PiccomaSmartToonRankingCategories),
    default: Object.keys(PiccomaSmartToonRankingCategories).shift(),
  })
  readonly category: PiccomaSmartToonRankingCategories;

  @IsNumber()
  @ApiProperty({
    description:
      '픽코마 데이터 요청시 요청 데이터의 최대 길이를 설정하는 값 입니다.',
    minimum: 1,
    maximum: 100,
    default: 50,
  })
  readonly itemLength: number | null;
}
