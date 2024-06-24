import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import ItemsEntity from 'src/entity/items.entity';
import {ItemsQueryReqDto} from 'src/items/dto/items.dto';
import {Brackets, Repository} from 'typeorm';

@CustomRepository(ItemsEntity)
export class ItemsRepository extends Repository<ItemsEntity> {
  async findAllItemsAndOptions(queryParams: ItemsQueryReqDto) {
    const {search, page, size} = queryParams;
    const queryBuilder = this.createQueryBuilder(DB.ITEMS).leftJoinAndSelect(
      `${DB.ITEMS_OPTIONS}`,
      DB.ITEMS_OPTIONS
    );

    if (search) {
      new Brackets(qb => {
        qb.andWhere(`${DB.ITEMS}.name LIKE :name`, {
          name: `%${search}%`,
        }).orWhere(`${DB.ITEMS_OPTIONS}.name LIKE :name`, {
          name: `%${search}%`,
        });
      });
    }

    // //orderby
    queryBuilder
      .andWhere(`${DB.ITEMS}.deleted_at = null`)
      .orderBy(`${DB.ITEMS}.name`, `ASC`);

    return {
      data: await queryBuilder
        .take(size)
        .skip((page - 1) * size)
        .getMany(),
      totalCount: await queryBuilder.getCount(),
    };
  }
}
