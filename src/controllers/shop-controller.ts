import { BodyParams, Controller, Get, Post } from '@tsed/common';
import { Shop } from '../entities/shop';
import { ShopService } from '../services/shop.service';

@Controller('/shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Post('/')
  create(@BodyParams() shop: Shop): Promise<Shop> {
    return this.shopService.create(shop);
  }

  @Get('/')
  getList(): Promise<Shop[]> {
    return this.shopService.find();
  }
}
