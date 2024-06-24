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
  DeleteItemsResDto,
} from './dto/items.dto';
import {ApiTags} from '@nestjs/swagger';
import {ApiDeco} from '../decorator/api.decorator'

@ApiTags('items')
@Controller('')
export class ItemsController {
  constructor(
    @Inject('itemsService')
    private itemsService: ItemsService
  ) {}

  @ApiDeco({
    operation: { summary: '상품 리스트 조회' },
    responses: { type: ItemsResDto},
  })
  @Get('/')
  async getItems(@Query() query: ItemsQueryReqDto) {
    return await this.itemsService.getItemsList(query);
  }

  @ApiDeco({
    operation: { summary: '상품 등록' },
    responses: { type: ItemsResDto},
  })
  @Post('/')
  async createItem(@Body() body: ItemsReqDto) {}

  @ApiDeco({
    operation: { summary: '상품 수정' },
    responses: { type: ItemsResDto},
  })
  @Patch('/:seq')
  async updateItem(
    @Param() params: ItemParamsReqDto,
    @Body() body: ItemsReqDto
  ) {}

  @ApiDeco({
    operation: { summary: '상품 삭제' },
    responses: { type: DeleteItemsResDto}
  })
  @Delete('/:seq')
  async deleteItem(@Param() params: ItemParamsReqDto) {}
}
