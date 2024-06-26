import {IsArray, IsBoolean, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {PaymentStatus} from 'src/enums/payment.status';
import ItemsEntity from 'src/entity/items.entity';
import UsersEntity from 'src/entity/users.entity';
import ItemOptionsEntity from 'src/entity/item.options.entity';
import {PaymentDetailStatus} from 'src/enums/payment.detail.status';
import PayMethodEntity from 'src/entity/paymethod.entity';

export class UserQueryDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '유저번호',
  })
  @IsNumber()
  userSeq: number;
}

export class PaymentParamsReqDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '거래번호',
  })
  @IsNumber()
  seq: number;
}

export class PaymentReqDto {
  @ApiProperty({
    name: 'user',
    required: false,
    example: 1,
    description: '유저번호',
  })
  @IsNumber()
  user: number;

  @ApiProperty({
    name: 'pay_type',
    required: false,
    example: 1,
    description: '결제수단번호',
  })
  @IsNumber()
  payType: number;

  @ApiProperty({
    name: 'detail',
    required: false,
    example: [],
    description: '거래목록',
  })
  @IsArray()
  detail: PaymentDetailReqDto[];
}

export class PaymentDetailReqDto {
  payment: number;
  @ApiProperty({
    name: 'item',
    required: false,
    example: 1,
    description: '상품번호',
  })
  @IsNumber()
  item: number;

  @ApiProperty({
    name: 'option',
    required: false,
    example: 1,
    description: '옵션번호',
  })
  @IsNumber()
  option: number;

  @ApiProperty({
    name: 'option_cnt',
    required: false,
    example: 1,
    description: '구매량',
  })
  @IsNumber()
  optionCnt: number;

  @ApiProperty({
    name: 'status',
    required: false,
    example: PaymentDetailStatus.PAYMENT,
    description: '거래상태',
  })
  @IsString()
  status: PaymentDetailStatus;
}

export class PaymentResDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '거래번호',
  })
  @IsNumber()
  seq: number;

  @ApiProperty({
    name: 'user',
    required: false,
    example: 1,
    description: '유저번호',
  })
  @IsNumber()
  user: UsersEntity | number;

  @ApiProperty({
    name: 'pay_type',
    required: false,
    example: 1,
    description: '결제수단번호',
  })
  @IsNumber()
  payType: PayMethodEntity | number;

  //   @ApiProperty({
  //     name: 'seq',
  //     required: false,
  //     example: 1,
  //     description: '총 거래 ',
  //   })
  //   @IsNumber()
  //   totalSellingPrice: number;

  @ApiProperty({
    name: 'status',
    required: false,
    example: 1,
    description: '거래상태',
  })
  status: PaymentStatus;

  @ApiProperty({
    name: 'detail',
    required: false,
    example: [],
    description: '거래목록',
  })
  @IsArray()
  detail: PaymentDetailResDto[];
}

export class PaymentDetailResDto {
  @ApiProperty({
    name: 'seq',
    required: false,
    example: 1,
    description: '거래번호',
  })
  @IsNumber()
  seq: number;

  @ApiProperty({
    name: 'item',
    required: false,
    example: 1,
    description: '상품번호',
  })
  @IsNumber()
  item: ItemsEntity | number;

  @ApiProperty({
    name: 'option',
    required: false,
    example: 1,
    description: '옵션번호',
  })
  @IsNumber()
  option: ItemOptionsEntity | number;

  @ApiProperty({
    name: 'option_cnt',
    required: false,
    example: 1,
    description: '구매량',
  })
  @IsNumber()
  optionCnt: number;

  @ApiProperty({
    name: 'selling_price',
    required: false,
    example: 1,
    description: '옵션 가격',
  })
  @IsNumber()
  sellingPrice: number;

  @ApiProperty({
    name: 'status',
    required: false,
    example: 1,
    description: '거래상태',
  })
  @IsString()
  status: PaymentDetailStatus;
}
