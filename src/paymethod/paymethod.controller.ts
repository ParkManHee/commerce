import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {PaymethodService} from './paymethod.service';
import {ApiDeco} from 'src/decorator/api.decorator';
import {Reply, ReplyType} from 'src/decorator/reply.decorator';
import {
  PayMethodParamsReqDto,
  PayMethodReqDto,
  PayMethodResDto,
  UsersParamsReqDto,
} from './dto/pay.method.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('paymethod')
@Controller()
export class PaymethodController {
  constructor(
    @Inject('paymethodService')
    private paymethodService: PaymethodService
  ) {}

  @ApiDeco({
    operation: {summary: '결제 수단 리스트 조회'},
    responses: {type: PayMethodResDto},
  })
  @Get('/:seq')
  async getPayMethods(
    @Reply() reply: ReplyType,
    @Param() params: UsersParamsReqDto
  ) {
    return reply(await this.paymethodService.getPayMethod(params.seq));
  }

  @ApiDeco({
    operation: {summary: '결제 수단 생성'},
    responses: {type: PayMethodResDto},
  })
  @Post('/:seq')
  async createPayMethods(
    @Reply() reply: ReplyType,
    @Param() params: UsersParamsReqDto,
    @Body() body: PayMethodReqDto
  ) {
    return reply(await this.paymethodService.createPayMethod(params.seq, body));
  }

  @ApiDeco({
    operation: {summary: '결제 수단 삭제'},
    responses: {type: PayMethodResDto},
  })
  @Delete('/:seq')
  async deletePayMethods(
    @Reply() reply: ReplyType,
    @Param() params: PayMethodParamsReqDto
  ) {
    return reply(await this.paymethodService.deletePayMethod(params.seq));
  }
}
