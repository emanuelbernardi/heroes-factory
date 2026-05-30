import { AppDataSource } from '../database/data-source';
import { Hero } from '../entities/hero.entity';

export const HeroRepository = AppDataSource.getRepository(Hero).extend({
  async findPaginated(page: number, limit: number, search?: string) {
    const query = this.createQueryBuilder('hero')
      .orderBy('hero.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      query.where(
        'hero.name LIKE :search OR hero.nickname LIKE :search',
        { search: `%${search}%` }
      );
    }

    const [data, total] = await query.getManyAndCount();
    return { data, total, page, limit };
  }
});