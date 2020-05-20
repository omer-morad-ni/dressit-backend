import { Injectable } from '@tsed/di';
import { ShopRepository } from '../repositories/shop-repository';
import { Shop } from '../entities/shop';

@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: ShopRepository) {}

  public async create(shop: Shop): Promise<Shop> {
    return this.shopRepository.create(shop);
  }
}
