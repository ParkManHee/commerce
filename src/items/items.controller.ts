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
import {ItemsService} from './items.service';
import {
  ItemParamsReqDto,
  ItemsQueryReqDto,
  ItemsResDto,
  ItemsReqDto,
  UpdateItemsResDto,
} from './dto/items.dto';
import {ApiTags} from '@nestjs/swagger';
import {ApiDeco} from '../decorator/api.decorator';
import {Reply, ReplyType} from 'src/decorator/reply.decorator';

@ApiTags('items')
@Controller('')
export class ItemsController {
  constructor(
    @Inject('itemsService')
    private itemsService: ItemsService
  ) {}

  @ApiDeco({
    operation: {summary: '상품 리스트 조회'},
    responses: {type: ItemsResDto},
  })
  @Get('/')
  async getItems(@Reply() reply: ReplyType, @Query() query: ItemsQueryReqDto) {
    return reply(await this.itemsService.getItemsList(query));
  }

  @ApiDeco({
    operation: {summary: '상품 상세 조회'},
    responses: {type: ItemsResDto},
  })
  @Get('/:seq')
  async getItemDetail(
    @Reply() reply: ReplyType,
    @Param() params: ItemParamsReqDto
  ) {
    return reply(await this.itemsService.getItemsDetail(params.seq));
  }

  @ApiDeco({
    operation: {summary: '상품 등록'},
    responses: {type: ItemsResDto},
  })
  @Post('/')
  async createItem(@Reply() reply: ReplyType, @Body() body: ItemsReqDto) {
    return reply(await this.itemsService.createItem(body));
  }

  @ApiDeco({
    operation: {summary: '상품 수정'},
    responses: {type: UpdateItemsResDto},
  })
  @Patch('/:seq')
  async updateItem(
    @Reply() reply: ReplyType,
    @Param() params: ItemParamsReqDto,
    @Body() body: ItemsReqDto
  ) {
    return reply(await this.itemsService.updateItem(params.seq, body));
  }

  @ApiDeco({
    operation: {summary: '상품 삭제'},
    responses: {type: UpdateItemsResDto},
  })
  @Delete('/:seq')
  async deleteItem(
    @Reply() reply: ReplyType,
    @Param() params: ItemParamsReqDto
  ) {
    return reply(await this.itemsService.deleteItem(params.seq));
  }
}
