import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class OptionParamsReqDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '옵션 아이디',
  })
  @IsNumber()
  seq: number;
}

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

export class OptionQueryReqDto {
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

export class OptionReqDto {
  @ApiProperty({
    name: 'item',
    required: true,
    example: '1',
    description: '상품 아이디',
  })
  @IsNumber()
  item: number;

  @ApiProperty({
    name: 'name',
    required: true,
    example: 'trackpad',
    description: '옵션 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'supply_price',
    required: true,
    example: '90000',
    description: '공급가',
  })
  @IsNumber()
  supplyPrice: number;

  @ApiProperty({
    name: 'selling_price',
    required: true,
    example: '100000',
    description: '판매가',
  })
  @IsNumber()
  sellingPrice: number;

  @ApiProperty({
    name: 'stock',
    required: true,
    example: '50',
    description: '재고',
  })
  @IsNumber()
  stock: number;
}

export class OptionResDto {
  @ApiProperty({
    name: 'seq',
    required: true,
    example: 'macbook',
    description: '옵션 아이디',
  })
  @IsNumber()
  seq: number;

  @ApiProperty({
    name: 'name',
    required: true,
    example: 'trackpad',
    description: '옵션 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'supply_price',
    required: true,
    example: '90000',
    description: '공급가',
  })
  @IsNumber()
  supplyPrice: number;

  @ApiProperty({
    name: 'selling_price',
    required: true,
    example: '10000',
    description: '판매가',
  })
  @IsNumber()
  sellingPrice: number;

  @ApiProperty({
    name: 'stock',
    required: true,
    example: '50',
    description: '재고',
  })
  @IsNumber()
  stock: number;
}

export class UpdateOptionResDto {
  @ApiProperty({
    name: 'is_success',
    required: true,
    example: true,
    description: '성공 유무',
  })
  @IsBoolean()
  isSuccess: boolean;
}
