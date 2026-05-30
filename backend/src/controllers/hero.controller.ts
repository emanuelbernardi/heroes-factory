import { Request, Response } from 'express';
import { HeroService } from '../services/hero.service';

const service = new HeroService();

export class HeroController {
  async create(req: Request, res: Response) {
    try {
      const hero = await service.create(req.body);
      return res.status(201).json(hero);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const { page = 1, limit = 10, search } = req.query;
    const searchTerm = Array.isArray(search) ? search[0] : search;
    const result = await service.findAll(Number(page), Number(limit), searchTerm as string);
    return res.json(result);
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const hero = await service.findOne(id);
      return res.json(hero);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const hero = await service.update(id, req.body);
      return res.json(hero);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await service.remove(id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async toggleActive(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const hero = await service.toggleActive(id);
      return res.json(hero);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}