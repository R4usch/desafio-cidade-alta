import { ApiProperty } from '@nestjs/swagger';

export class EquipDTO {
  @ApiProperty({ description: 'SLUG do emblema a ser equipado' })
  slug: string;

  @ApiProperty({ description: 'Valor de equipar ou desequipar' })
  equip: boolean;
}
