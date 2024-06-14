import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Emblem } from '../database/entity/emblem.entity';
import { EmblemInventory } from 'src/database/entity/emblem-inventory.entity';

import { User } from 'src/database/entity/users.entity';
import { EquipResponse } from './enum/equip.enum';

@Injectable()
export class EmblemsService {
  constructor(
    @InjectRepository(Emblem)
    private emblemsRepository: Repository<Emblem>,
    @InjectRepository(EmblemInventory)
    private emblemsInventoryRepository: Repository<EmblemInventory>,
  ) {}

  async getList(
    name?: string,
    start?: number,
    end?: number,
  ): Promise<Emblem[]> {
    let limit = -1;
    if (start != undefined && end != undefined) limit = end - start;

    if (!name) {
      return this.emblemsRepository.find(
        limit > 0 ? { skip: start, take: limit } : {},
      );
    } else {
      const query = this.emblemsRepository
        .createQueryBuilder()
        .where('slug like :name', { name: `%${name}%` });
      return limit > 0
        ? query.skip(start).take(limit).getMany()
        : query.getMany();
    }
  }

  async getUserInventory(user: User): Promise<EmblemInventory[]> {
    return this.emblemsInventoryRepository.findBy({ user_id: user.id });
  }

  async getEmblemBySlug(slug: string): Promise<Emblem> {
    return this.emblemsRepository.findOneBy({ slug });
  }

  async getEmblemInventoryBySlug(
    user: User,
    slug: string,
  ): Promise<EmblemInventory> {
    const emblem = await this.getEmblemBySlug(slug);
    if (emblem == null) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Emblem not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.emblemsInventoryRepository.findOneBy({
      emblem_id: emblem.id,
      user_id: user.id,
    });
  }

  async redeemEmblem(user: User, slug: string): Promise<boolean> {
    const already = await this.getEmblemInventoryBySlug(user, slug);
    const emblem = await this.getEmblemBySlug(slug);

    if (already == null && emblem != null) {
      const newEmblem = this.emblemsInventoryRepository.create({
        emblem_id: emblem.id,
        user_id: user.id,
      });
      await this.emblemsInventoryRepository.save(newEmblem);
      return true;
    } else {
      return false;
    }
  }

  async getUserEmblemsEquipped(user: User): Promise<EmblemInventory[]> {
    return this.emblemsInventoryRepository.findBy({
      user_id: user.id,
      equipped: 1,
    });
  }

  async equipEmblem(
    user: User,
    slug: string,
    equip: boolean,
  ): Promise<EquipResponse> {
    const exists = await this.getEmblemInventoryBySlug(user, slug);

    const inventory = await this.getUserEmblemsEquipped(user);

    if (inventory.length >= 3 && equip) return EquipResponse.CantEquip;

    await this.emblemsInventoryRepository.save({
      id: exists.id,
      equipped: equip ? 1 : 0,
    });
    return equip ? EquipResponse.Equipped : EquipResponse.Unequipped;
  }

  async createEmblem(id : number, slug : string, name : string, image : string){

    let emblem = await this.getEmblemBySlug(slug)
    console.log(emblem)
    if(emblem != null) throw new InternalServerErrorException({message: "Emblem already exists"})

    const newEmblem = this.emblemsRepository.create({
      id,
      slug,
      name,
      image,
    });
    console.log(newEmblem)
    await this.emblemsRepository.save(newEmblem); 
  }
}
