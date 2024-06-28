import {DB} from 'src/constants/db';
import {CustomRepository} from 'src/decorator/custom-repository.decorator';
import ItemOptionsEntity from 'src/entity/item.options.entity';
import {DefaultStatus} from 'src/enums/default.status';
import {OptionQueryReqDto} from 'src/options/dto/options.dto';
import {Brackets, Repository} from 'typeorm';

@CustomRepository(ItemOptionsEntity)
export class ItemOptionsRepository extends Repository<ItemOptionsEntity> {
  async getOptions(seq: number, query: OptionQueryReqDto) {
    const {search, page, size} = query;
    try {
      const queryBuilder = this.createQueryBuilder(DB.ITEMS_OPTIONS)
        .where(`${DB.ITEMS_OPTIONS}.status = :status`, {
          status: DefaultStatus.ACTIVE,
        })
        .andWhere(`${DB.ITEMS_OPTIONS}.item_seq = :seq`, {
          seq: seq,
        });

      if (search) {
        new Brackets(qb => {
          qb.andWhere(`${DB.ITEMS_OPTIONS}.name LIKE :name`, {
            name: `%${search}%`,
          });
        });
      }

      queryBuilder.orderBy(`${DB.ITEMS_OPTIONS}.name`, `ASC`);
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
}
