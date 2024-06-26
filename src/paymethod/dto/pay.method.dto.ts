import {IsArray, IsBoolean, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {PayType} from 'src/enums/pay.type.enum';

export class UsersParamsReqDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '유저 아이디',
  })
  @IsNumber()
  seq: number;
}

export class PayMethodParamsReqDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '결제타입 아이디',
  })
  @IsNumber()
  seq: number;
}

export class PayMethodReqDto {
  @ApiProperty({
    name: 'pay_type',
    required: true,
    example: 'CREDITCARD',
    description: '결제수단 타입',
  })
  @IsString()
  payType: PayType;

  @ApiProperty({
    name: 'name',
    required: true,
    example: 'name',
    description: '결제 카드 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'card_num',
    required: true,
    example: '1111-1111-1111-111',
    description: '결제 카드 번호',
  })
  @IsString()
  cardNum: string;
}

export class PayMethodResDto {
  @ApiProperty({
    name: 'seq',
    required: true,
    example: '1',
    description: '결제수단 아이디',
  })
  @IsNumber()
  seq: number;

  @IsArray()
  user: [];

  @ApiProperty({
    name: 'name',
    required: true,
    example: 'name',
    description: '결제 카드 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'pay_type',
    required: true,
    example: 'creadit',
    description: '결제수단 타입',
  })
  @IsString()
  payType: string;

  @ApiProperty({
    name: 'card_num',
    required: true,
    example: '1111-1111-1111-111',
    description: '결제 카드 번호',
  })
  @IsString()
  cardNum: string;
}
