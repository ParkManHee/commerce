import {IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ItemParamsReqDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '아이템 아이디',
  })
  @IsNumber()
  seq: number;
}

export class ItemsQueryReqDto {
  @IsString()
  search?: string;
  @IsNumber()
  page?: number = 1;
  @IsNumber()
  size?: number = 10;
}

export class PostItemsReqDto {
  @IsString()
  name: string;
  @IsNumber()
  supplyPrice: number;
  @IsNumber()
  sellingPrice: number;
}

export class UpdateItemsReqDto {
  @IsString()
  name: string;
  @IsNumber()
  supplyPrice: number;
  @IsNumber()
  sellingPrice: number;
}
