import { BaseEntity, Check, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'last_refresh' })
export class LastRefresh extends BaseEntity {
  @PrimaryColumn({ default: true })
  @Check('"pk"')
  pk!: boolean;

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
