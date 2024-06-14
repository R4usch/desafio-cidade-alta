import { Module } from '@nestjs/common';
import { EmblemController } from './emblems.controller';
import { EmblemsService } from './emblems.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emblem } from '../database/entity/emblem.entity';
import { User } from 'src/database/entity/users.entity';
import { EmblemInventory } from 'src/database/entity/emblem-inventory.entity';
import { UsersServices } from 'src/database/services/users.services';
@Module({
  imports: [TypeOrmModule.forFeature([Emblem, User, EmblemInventory])],
  controllers: [EmblemController],
  providers: [EmblemsService, UsersServices],
})
export class EmblemsModule {}
