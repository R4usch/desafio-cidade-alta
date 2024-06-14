import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmblemsService } from './emblems.service';
import { RequireLogin } from 'src/auth/decorators/requirelogin.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/database/entity/users.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Emblem } from 'src/database/entity/emblem.entity';
import { EmblemInventory } from 'src/database/entity/emblem-inventory.entity';

@ApiTags('Emblemas')
@ApiBearerAuth()
@Controller('emblems')
@UseGuards(AuthGuard)
export class EmblemController {
  constructor(private readonly emblemsService: EmblemsService) {}

  //#region Docs
  @ApiOperation({
    summary:
      'Retorna a lista de emblemas, opcionalmente podendo utilizar argumentos',
    description:
      'Retorna a lista de emblemas cadastrados. Pode se utilizar, opcionalmente, o argumento **name** para se filtrar os resultados com base no nome, e pode se utilizar o argumento **page** para paginar os resultados de 5 em 5.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Nome para pesquisa',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Pagina para indexar',
  })
  @ApiResponse({
    status: 200,
    description: 'A lista foi retornada com sucesso',
    type:Emblem
  })
  @ApiResponse({
    status: 400,
    description: 'O número da pagina foi igual ou menor que 0',
  })
  //#endregion
  @Get('list')
  async getList(@Query('name') name: string, @Query('page') page: number) {
    if (page) if (page <= 0) throw new BadRequestException();
    const data = await this.emblemsService.getList(
      name,
      page ? (page - 1) * 5 : undefined,
      page ? page * 5 : undefined,
    );
    return data;
  }

  //#region Docs
  @ApiOperation({
    summary:
      'Retorna o inventário de emblemas do usuário. Requer um login autenticado',
    description:
      'Retorna todo o inventário de emblemas do usuário responsável pelo **Bearer token** de login. Requer um login autenticado.',
  })
  @ApiResponse({ status: 200, description: 'Retorna a lista de emblemas pertence ao usuário', type:EmblemInventory })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  //#endregion
  @Get('inventory')
  @RequireLogin()
  async getInventory(@GetUser() user: User) {
    const data = await this.emblemsService.getUserInventory(user);
    return data;
  }

  //#region Docs
  @ApiOperation({
    summary:
      'Resgata um emblema com base no slug. Não permite resgatar duas vezes o mesmo emblema',
    description:
      'Resgata um emblema com o slug e adiciona ao inventário do usuário responsável pelo **Bearer token** de login. Requer um login autenticado.',
  })
  @ApiQuery({
    name: 'slug',
    required: true,
    description: 'Slug do emblema a ser resgatado',
  })
  @ApiResponse({ status: 201, description: 'Emblema resgastado com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Emblema inexistente ou slug não providenciado',
  })
  @ApiResponse({
    status: 500,
    description: 'Emblema já resgatado',
  })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  //#endregion
  @Post('redeem')
  @RequireLogin()
  async redeemEmblem(@GetUser() user: User, @Query('slug') slug: string) {
    if (!slug) throw new BadRequestException('Slug emblem not provided');
    const redeemed = await this.emblemsService.redeemEmblem(user, slug);
    if (!redeemed) {
      throw new InternalServerErrorException({
        message: `Emblem already redeemed`,
      });
    }
    return { message: `Emblem redeemed` };
  }
}
