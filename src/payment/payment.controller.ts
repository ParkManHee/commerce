import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ApiDeco} from '../decorator/api.decorator';
import {PaymentService} from './payment.service';
import {Reply, ReplyType} from 'src/decorator/reply.decorator';
import {
  PaymentParamsReqDto,
  PaymentReqDto,
  PaymentResDto,
  PaymentReturnReqDto,
  UserQueryDto,
} from './dto/payment.dto';

@ApiTags('payment')
@Controller('')
export class PaymentController {
  constructor(
    @Inject('paymentService')
    private paymentService: PaymentService
  ) {}

  @ApiDeco({
    operation: {summary: '구매 리스트 조회'},
    responses: {type: PaymentResDto},
  })
  @Get('/')
  async getPayments(@Reply() reply: ReplyType, @Query() query: UserQueryDto) {
    return reply(await this.paymentService.getPayments(query.userSeq));
  }

  @ApiDeco({
    operation: {summary: '구매'},
    responses: {type: PaymentResDto},
  })
  @Post('/')
  async createPayment(@Reply() reply: ReplyType, @Body() body: PaymentReqDto) {
    return reply(await this.paymentService.createPayment(body));
  }

  @ApiDeco({
    operation: {summary: '반품'},
    responses: {type: PaymentResDto},
  })
  @Patch('/return/:seq')
  async returnItem(
    @Reply() reply: ReplyType,
    @Param() params: PaymentParamsReqDto,
    @Body() body: PaymentReturnReqDto
  ) {
    return reply(await this.paymentService.returnItem(params.seq, body));
  }
}
