import { Router } from 'express';
import { HeroController } from '../controllers/hero.controller';

const router = Router();
const controller = new HeroController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.findAll(req, res));
router.get('/:id', (req, res) => controller.findOne(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.remove(req, res));
router.patch('/:id/toggle', (req, res) => controller.toggleActive(req, res));

export default router;