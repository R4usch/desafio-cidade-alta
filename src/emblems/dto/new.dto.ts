import { ApiProperty } from '@nestjs/swagger';

export class NewEmblemDTO {
  @ApiProperty({ description: 'Identificador do emblema' })
  id: number;

  @ApiProperty({ description: 'SLUG do emblema a ser equipado' })
  slug: string;

  @ApiProperty({ description: 'Nome do Emblema' })
  name: string;

  @ApiProperty({ description: 'Caminho de imagem do emblema' })
  image_path: string;

}
