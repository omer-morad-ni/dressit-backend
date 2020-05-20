import { MaxLength, Property, Required } from '@tsed/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(100)
  @Required()
  name: string;

  @Column()
  @Required()
  location: string;

  @Column()
  @Required()
  gateway: string;
}
