import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emblems_inventory')
export class EmblemInventory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador unico do emblema no inventário' })
  id: number;

  @ApiProperty({ description: 'Identificador do emblema' })
  @Column()
  emblem_id: number;

  @ApiProperty({ description: 'Identificador do usuário a quem pertence o emblema' })
  @Column()
  user_id: number;

  @ApiProperty({ description: 'Data de resgate do emblema' })
  @Column()
  redeem_at: Date;
}
