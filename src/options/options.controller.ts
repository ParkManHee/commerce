import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ApiDeco} from '../decorator/api.decorator';
import {OptionsService} from './options.service';
import {Reply, ReplyType} from 'src/decorator/reply.decorator';
import {
  OptionParamsReqDto,
  OptionQueryReqDto,
  OptionReqDto,
  OptionResDto,
  UpdateOptionResDto,
} from './dto/options.dto';

@ApiTags('options')
@Controller()
export class OptionsController {
  constructor(
    @Inject('optionsService')
    private optionsService: OptionsService
  ) {}

  @ApiDeco({
    operation: {summary: '선택한 상품의 옵션 리스트 조회'},
    responses: {type: OptionResDto},
  })
  @Get('/:seq')
  async getOptions(
    @Reply() reply: ReplyType,
    @Param() params: OptionParamsReqDto,
    @Query() query: OptionQueryReqDto
  ) {
    return reply(await this.optionsService.getOptions(params.seq, query));
  }

  @ApiDeco({
    operation: {summary: '선택한 옵션 조회'},
    responses: {type: OptionResDto},
  })
  @Get('detail/:seq')
  async getOptionDetail(
    @Reply() reply: ReplyType,
    @Param() params: OptionParamsReqDto
  ) {
    return reply(await this.optionsService.findOptionDetail(params.seq));
  }

  @ApiDeco({
    operation: {summary: '옵션 추가'},
    responses: {type: OptionResDto},
  })
  @Post('/')
  async createOptions(@Reply() reply: ReplyType, @Body() body: OptionReqDto) {
    return reply(await this.optionsService.createOption(body));
  }

  @ApiDeco({
    operation: {summary: '옵션 업데이트'},
    responses: {type: UpdateOptionResDto},
  })
  @Patch('/:seq')
  async updateOptions(
    @Reply() reply: ReplyType,
    @Param() params: OptionParamsReqDto,
    @Body() body: OptionReqDto
  ) {
    return reply(await this.optionsService.updateOption(params.seq, body));
  }

  @ApiDeco({
    operation: {summary: '옵션 삭제'},
    responses: {type: UpdateOptionResDto},
  })
  @Delete('/:seq')
  async deleteOptions(
    @Reply() reply: ReplyType,
    @Param() params: OptionParamsReqDto
  ) {
    return reply(await this.optionsService.deleteOption(params.seq));
  }
}
