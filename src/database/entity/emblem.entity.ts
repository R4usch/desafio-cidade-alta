import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emblems')
export class Emblem {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador unico do emblema' })
  id: number;

  @ApiProperty({ description: 'Parte da URL do emblema' })
  @Column()
  slug: string;

  @ApiProperty({ description: 'Nome do emblema' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Caminho de imagem do emblema' }) 
  @Column()
  image: string;
}
