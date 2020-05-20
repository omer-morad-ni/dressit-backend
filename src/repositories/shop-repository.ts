import { EntityRepository, Repository } from 'typeorm';
import { Shop } from '../entities/shop';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
  findByID(id: string): Promise<Shop> {
    return this.findOne(id);
  }
}
