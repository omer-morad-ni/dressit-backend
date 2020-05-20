import { Format, Required } from '@tsed/common';
import { Description, Example } from '@tsed/swagger';
import { Column } from 'typeorm';
import { Shop } from '../entities/shop';

export class ShopDto extends Shop {
  @Description('User password')
  @Example('Bershka')
  @Column()
  @Required()
  name: string;

  @Description('User email')
  @Example('user@domain.com')
  @Format('email')
  @Column({ unique: true })
  email: string;
}
