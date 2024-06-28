import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import ItemsEntity from 'src/entity/items.entity';
import {DefaultStatus} from 'src/enums/default.status';
import {ItemsQueryReqDto} from 'src/items/dto/items.dto';
import {Brackets, Repository} from 'typeorm';

@CustomRepository(ItemsEntity)
export class ItemsRepository extends Repository<ItemsEntity> {
  async findAllItemsAndOptions(queryParams: ItemsQueryReqDto) {
    const {search, page, size} = queryParams;
    try {
      const queryBuilder = this.createQueryBuilder(DB.ITEMS)
        .leftJoinAndSelect(`${DB.ITEMS}.options`, DB.ITEMS_OPTIONS)
        .where(`${DB.ITEMS}.status = :status`, {
          status: DefaultStatus.ACTIVE,
        });

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
      queryBuilder.orderBy(`${DB.ITEMS}.name`, `ASC`);
      return {
        data: await queryBuilder
          .take(size)
          .skip((page - 1) * size)
          .getMany(),
        totalCount: await queryBuilder.getCount(),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findItemsDetail(seq: number) {
    try {
      const queryBuilder = this.createQueryBuilder(DB.ITEMS)
        .leftJoinAndSelect(`${DB.ITEMS}.options`, DB.ITEMS_OPTIONS)
        .where(`${DB.ITEMS}.seq = :seq`, {seq: seq})
        .andWhere(`${DB.ITEMS}.status = :status`, {
          status: DefaultStatus.ACTIVE,
        });
      return {
        data: await queryBuilder.getOne(),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
