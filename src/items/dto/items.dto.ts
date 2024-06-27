import {IsArray, IsBoolean, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ItemParamsReqDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '상품 아이디',
  })
  @IsNumber()
  seq: number;
}

export class ItemsQueryReqDto {
  @ApiProperty({
    name: 'search',
    required: false,
    example: 'name',
    description: '검색 문자열',
  })
  @IsString()
  search?: string;

  @ApiProperty({
    name: 'page',
    required: false,
    example: '1',
    description: '페이지',
  })
  @IsNumber()
  page?: number = 1;

  @ApiProperty({
    name: 'size',
    required: false,
    example: '10',
    description: '페이지당개수',
  })
  @IsNumber()
  size?: number = 10;
}

export class ItemsReqDto {
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'macbook',
    description: '상품 이름',
  })
  @IsString()
  name: string;
}

export class ItemsResDto {
  @ApiProperty({
    name: 'seq',
    required: true,
    example: 'macbook',
    description: '상품 아이디',
  })
  @IsNumber()
  seq: number;

  @ApiProperty({
    name: 'name',
    required: true,
    example: 'macbook',
    description: '상품 이름',
  })
  @IsString()
  name: string;

  @IsArray()
  options: [];
}

export class UpdateItemsResDto {
  @ApiProperty({
    name: 'is_success',
    required: true,
    example: true,
    description: '성공 유무',
  })
  @IsBoolean()
  isSuccess: boolean;
}
