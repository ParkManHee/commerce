import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {ItemsService} from './items.service';
import {
  ItemParamsReqDto,
  ItemsQueryReqDto,
  PostItemsReqDto,
  UpdateItemsReqDto,
} from './dto/items.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('items')
@Controller('')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}
  @Get('/')
  async getItems(@Query() queryParams: ItemsQueryReqDto) {
    return await this.itemsService.getItemsList(queryParams);
  }

  @Post('/')
  async createItem(@Body() body: PostItemsReqDto) {}

  @Patch('/:seq')
  async updateItem(
    @Param() params: ItemParamsReqDto,
    @Body() body: UpdateItemsReqDto
  ) {}

  @Delete('/:seq')
  async deleteItem(@Param() params: ItemParamsReqDto) {}
}
