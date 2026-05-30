// src/services/hero.service.ts
import { HeroRepository } from '../repositories/hero.repository';
import { CreateHeroDto } from '../dtos/create-hero.dto';
import { UpdateHeroDto } from '../dtos/update-hero.dto';
import {
  NotFoundError,
  ValidationError,
  ForbiddenError,
} from '../middlewares/error.middleware';

export class HeroService {
  async create(dto: CreateHeroDto) {
    if (!dto.name || !dto.nickname) {
      throw new ValidationError('name e nickname são obrigatórios');
    }
    const hero = HeroRepository.create(dto);
    return HeroRepository.save(hero);
  }

  async findAll(page = 1, limit = 10, search?: string) {
    return HeroRepository.findPaginated(page, limit, search);
  }

  async findOne(id: string) {
    const hero = await HeroRepository.findOneBy({ id });
    if (!hero) throw new NotFoundError('Herói não encontrado');
    return hero;
  }

  async update(id: string, dto: UpdateHeroDto) {
    const hero = await this.findOne(id);
    if (!hero.is_active) {
      throw new ForbiddenError('Não é possível editar um herói inativo');
    }
    Object.assign(hero, dto);
    return HeroRepository.save(hero);
  }

  async remove(id: string) {
    const hero = await this.findOne(id);
    return HeroRepository.remove(hero);
  }

  async toggleActive(id: string) {
    const hero = await this.findOne(id);
    hero.is_active = !hero.is_active;
    return HeroRepository.save(hero);
  }
}